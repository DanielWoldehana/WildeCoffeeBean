import { renderHook, waitFor } from '@testing-library/react'
import { useMenu } from '@/hooks/useMenu'
import * as api from '@/lib/api'

// Mock the API
jest.mock('@/lib/api', () => ({
  menuApi: {
    getAll: jest.fn(),
  },
}))

describe('useMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch menu items on mount', async () => {
    const mockMenuItems = [
      { _id: '1', name: 'Latte', price: 4.89 },
      { _id: '2', name: 'Cappuccino', price: 4.99 },
    ]

    api.menuApi.getAll.mockResolvedValue(mockMenuItems)

    const { result } = renderHook(() => useMenu())

    expect(result.current.loading).toBe(true)
    expect(result.current.menuItems).toEqual([])

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.menuItems).toEqual(mockMenuItems)
    expect(result.current.error).toBeNull()
      expect(api.menuApi.getAll).toHaveBeenCalledTimes(1)
  })

  it('should handle errors', async () => {
    const errorMessage = 'Failed to fetch menu'
    api.menuApi.getAll.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useMenu())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.menuItems).toEqual([])
  })

  it('should pass filters to API', async () => {
    const mockMenuItems = []
    api.menuApi.getAll.mockResolvedValue(mockMenuItems)

    const filters = { section: 'Coffee & Espresso', available: true }
    renderHook(() => useMenu(filters))

    await waitFor(() => {
      expect(api.menuApi.getAll).toHaveBeenCalledWith(filters)
    })
  })

  it('should refetch when refetch is called', async () => {
    const mockMenuItems = [{ _id: '1', name: 'Latte' }]
    api.menuApi.getAll.mockResolvedValue(mockMenuItems)

    const { result } = renderHook(() => useMenu())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(api.menuApi.getAll).toHaveBeenCalledTimes(1)

    await waitFor(async () => {
      await result.current.refetch()
    })

    await waitFor(() => {
      expect(api.menuApi.getAll).toHaveBeenCalledTimes(2)
    })
  })
})

