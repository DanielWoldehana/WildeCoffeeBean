import { renderHook, waitFor } from '@testing-library/react'
import { useProducts } from '@/hooks/useProducts'
import * as api from '@/lib/api'

// Mock the API
jest.mock('@/lib/api', () => ({
  productsApi: {
    getAll: jest.fn(),
  },
}))

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch products on mount', async () => {
    const mockProducts = [
      { _id: '1', name: 'Product 1', price: 10 },
      { _id: '2', name: 'Product 2', price: 20 },
    ]

    api.productsApi.getAll.mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual(mockProducts)
    expect(result.current.error).toBeNull()
      expect(api.productsApi.getAll).toHaveBeenCalledTimes(1)
  })

  it('should handle errors', async () => {
    const errorMessage = 'Failed to fetch products'
    api.productsApi.getAll.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.products).toEqual([])
  })

  it('should pass filters to API', async () => {
    const mockProducts = []
    api.productsApi.getAll.mockResolvedValue(mockProducts)

    const filters = { category: 'arabica', inStock: true }
    renderHook(() => useProducts(filters))

    await waitFor(() => {
      expect(api.productsApi.getAll).toHaveBeenCalledWith(filters)
    })
  })

  it('should refetch when refetch is called', async () => {
    const mockProducts = [{ _id: '1', name: 'Product 1' }]
    api.productsApi.getAll.mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(api.productsApi.getAll).toHaveBeenCalledTimes(1)

    await waitFor(async () => {
      await result.current.refetch()
    })

    await waitFor(() => {
      expect(api.productsApi.getAll).toHaveBeenCalledTimes(2)
    })
  })
})

