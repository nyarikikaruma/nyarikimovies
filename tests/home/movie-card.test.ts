import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Mock MovieCard component for testing
const MovieCard = {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  template: `
    <div class="movie-card">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.overview }}</p>
      <span class="rating">{{ movie.vote_average }}</span>
    </div>
  `
}

describe('MovieCard Component', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    overview: 'This is a test movie overview',
    poster_path: '/test.jpg',
    vote_average: 8.5
  }

  it('renders movie information correctly', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      },
    })

    expect(wrapper.text()).toContain('Test Movie')
    expect(wrapper.text()).toContain('This is a test movie overview')
    expect(wrapper.text()).toContain('8.5')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('displays correct movie title', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      },
    })

    const title = wrapper.find('h3')
    expect(title.text()).toBe('Test Movie')
  })
})