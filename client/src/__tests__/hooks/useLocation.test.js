import { renderHook, waitFor } from '@testing-library/react'
import { useLocation } from '@/hooks/useLocation'
import * as api from '@/lib/api'

// Mock the API
jest.mock('@/lib/api', () => ({
  locationApi: {
    getLocation: jest.fn(),
  },
}))

describe('useLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch location on mount', async () => {
    const mockLocation = {
      _id: '1',
      name: 'Wild Bean Coffee',
      address1: '123 Test St',
      city: 'Test City',
      coordinates: { lat: 39.0834, lng: -77.1533 },
    }

    api.locationApi.getLocation.mockResolvedValue(mockLocation)

    const { result } = renderHook(() => useLocation())

    expect(result.current.loading).toBe(true)
    expect(result.current.location).toBeNull()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.location).toEqual(mockLocation)
    expect(result.current.error).toBeNull()
      expect(api.locationApi.getLocation).toHaveBeenCalledTimes(1)
  })

  it('should handle errors', async () => {
    const errorMessage = 'Failed to fetch location'
    api.locationApi.getLocation.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useLocation())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.location).toBeNull()
  })

  it('should refetch when refetch is called', async () => {
    const mockLocation = { _id: '1', name: 'Test Location' }
    api.locationApi.getLocation.mockResolvedValue(mockLocation)

    const { result } = renderHook(() => useLocation())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(api.locationApi.getLocation).toHaveBeenCalledTimes(1)

    await waitFor(async () => {
      await result.current.refetch()
    })

    await waitFor(() => {
      expect(api.locationApi.getLocation).toHaveBeenCalledTimes(2)
    })
  })
})

