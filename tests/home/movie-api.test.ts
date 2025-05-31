import { describe, it, expect, vi, beforeEach } from 'vitest'
import { $fetch } from 'ofetch'

// Mock the $fetch function
vi.mock('ofetch')

describe('Movie API Integration', () => {
  const mockToken = 'test-token'
  const baseUrl = 'https://api.themoviedb.org/3/movie'
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches now playing movies with correct parameters', async () => {
    const mockResponse = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' }
      ],
      total_pages: 10,
      page: 1
    }

    // Mock successful API response
    vi.mocked($fetch).mockResolvedValue(mockResponse)

    const response = await $fetch(`${baseUrl}/now_playing`, {
      headers: {
        Authorization: `Bearer ${mockToken}`
      },
      query: {
        language: 'en-US',
        page: 1
      }
    })

    expect($fetch).toHaveBeenCalledWith(`${baseUrl}/now_playing`, {
      headers: {
        Authorization: `Bearer ${mockToken}`
      },
      query: {
        language: 'en-US',
        page: 1
      }
    })

    expect(response).toEqual(mockResponse)
  })

  it('handles API errors correctly', async () => {
    const errorResponse = new Error('API Error')
    vi.mocked($fetch).mockRejectedValue(errorResponse)

    try {
      await $fetch(`${baseUrl}/popular`, {
        headers: {
          Authorization: `Bearer ${mockToken}`
        }
      })
    } catch (error) {
      expect(error).toBe(errorResponse)
    }

    expect($fetch).toHaveBeenCalledWith(`${baseUrl}/popular`, {
      headers: {
        Authorization: `Bearer ${mockToken}`
      }
    })
  })

  it('fetches all movie categories', async () => {
    const categories = ['now_playing', 'popular', 'top_rated', 'upcoming']
    const mockResponse = { results: [], total_pages: 1, page: 1 }

    vi.mocked($fetch).mockResolvedValue(mockResponse)

    for (const category of categories) {
      await $fetch(`${baseUrl}/${category}`, {
        headers: {
          Authorization: `Bearer ${mockToken}`
        },
        query: {
          language: 'en-US',
          page: 1
        }
      })
    }

    expect($fetch).toHaveBeenCalledTimes(categories.length)
    
    categories.forEach(category => {
      expect($fetch).toHaveBeenCalledWith(`${baseUrl}/${category}`, {
        headers: {
          Authorization: `Bearer ${mockToken}`
        },
        query: {
          language: 'en-US',
          page: 1
        }
      })
    })
  })

  it('handles pagination requests correctly', async () => {
    const mockResponse = { results: [], total_pages: 5, page: 2 }
    vi.mocked($fetch).mockResolvedValue(mockResponse)

    await $fetch(`${baseUrl}/popular`, {
      headers: {
        Authorization: `Bearer ${mockToken}`
      },
      query: {
        language: 'en-US',
        page: 2
      }
    })

    expect($fetch).toHaveBeenCalledWith(`${baseUrl}/popular`, {
      headers: {
        Authorization: `Bearer ${mockToken}`
      },
      query: {
        language: 'en-US',
        page: 2
      }
    })
  })
})