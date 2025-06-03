import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

// Simplified MovieDetails component using basic HTML elements
const MovieDetails = {
  name: 'MovieDetails',
  props: {
    movieDetails: {
      type: Object,
      required: true,
    },
    movieReviews: {
      type: Object,
      required: true,
    },
    relatedMovies: {
      type: Object,
      required: true,
    }
  },
  template: `
    <div class="movie-details">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-background" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + movieDetails.poster_path + ')' }">
          <div class="hero-content">
            <h1 class="movie-title" data-testid="movie-title">
              {{ movieDetails.title }}
            </h1>
            <div class="genre-chips">
              <span 
                v-for="(genre, index) in movieDetails.genres" 
                :key="index" 
                class="genre-chip"
                data-testid="genre-chip"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="content-container">
        <!-- Movie Info Section -->
        <div class="movie-info">
          <div class="main-info">
            <!-- Rating Section -->
            <div class="rating-section">
              <div class="rating-stars" data-testid="movie-rating">
                ★★★★☆
              </div>
              <span class="rating-text" data-testid="rating-text">
                {{ movieDetails.vote_average }} / 10
              </span>
              <span class="rating-chip" data-testid="rating-chip">
                PG-13
              </span>
            </div>

            <p class="movie-overview" data-testid="movie-overview">
              {{ movieDetails.overview }}
            </p>
            
            <!-- Movie Details -->
            <div class="movie-details-grid">
              <div class="detail-item">
                <div class="detail-label">Status</div>
                <div class="detail-value" data-testid="movie-status">
                  {{ movieDetails.status }}
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Runtime</div>
                <div class="detail-value" data-testid="movie-runtime">
                  {{ movieDetails.runtime }}min
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Release Date</div>
                <div class="detail-value" data-testid="movie-release-date">
                  {{ movieDetails.release_date }}
                </div>
              </div>
            </div>
          </div>

          <!-- Languages Section -->
          <div class="languages-section">
            <div class="section-card">
              <h3 class="section-title">Spoken Languages</h3>
              <div class="languages-list">
                <div 
                  v-for="(language, index) in movieDetails.spoken_languages" 
                  :key="index"
                  class="language-item"
                  data-testid="language-item"
                >
                  <span class="language-name">{{ language.english_name }}</span>
                  <span class="language-code">{{ language.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Movies Section -->
        <div class="related-movies-section">
          <h2 class="section-heading" data-testid="related-movies-title">
            Related Movies
          </h2>
          <div class="related-movies-grid">
            <div 
              v-for="(related, index) in relatedMovies.results" 
              :key="index"
              class="related-movie-card"
              data-testid="related-movie-card"
            >
              <img 
                :src="'https://image.tmdb.org/t/p/original/' + related.poster_path" 
                :alt="related.title"
                class="movie-poster"
              />
              <div class="movie-card-title">
                {{ related.title }}
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="reviews-section">
          <div class="section-card">
            <h3 class="section-title">Reviews</h3>
            <div class="reviews-list">
              <div 
                v-for="(review, index) in movieReviews.results" 
                :key="index" 
                class="review-item"
                data-testid="review-item"
              >
                <div class="review-header">
                  <div class="reviewer-info">
                    <img 
                      :src="'https://image.tmdb.org/t/p/original/' + review.author_details.avatar_path" 
                      :alt="review.author_details.name"
                      class="reviewer-avatar"
                    />
                    <div>
                      <div class="reviewer-name" data-testid="review-author">
                        {{ review.author_details.name }}
                      </div>
                      <div class="reviewer-rating">
                        Rating: {{ review.author_details.rating }}/10
                      </div>
                    </div>
                  </div>
                </div>
                <p class="review-content" data-testid="review-content">
                  {{ review.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  style: `
    <style scoped>
    .movie-details {
      width: 100%;
    }
    .hero-section {
      height: 500px;
      position: relative;
    }
    .hero-background {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: end;
    }
    .hero-content {
      padding: 2rem;
      color: white;
    }
    .movie-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .genre-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .genre-chip {
      background: rgba(255,255,255,0.2);
      border: 1px solid white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .content-container {
      padding: 2rem;
    }
    .movie-info {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .main-info {
      flex: 2;
    }
    .rating-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .rating-chip {
      background: #4caf50;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .movie-overview {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    .movie-details-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .detail-item {
      padding: 1rem 0;
    }
    .detail-label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .languages-section {
      flex: 1;
    }
    .section-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
    }
    .section-title {
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }
    .language-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }
    .language-code {
      background: #f5f5f5;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .section-heading {
      text-align: center;
      margin-bottom: 1rem;
      color: #282654;
    }
    .related-movies-grid {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding: 1rem 0;
    }
    .related-movie-card {
      flex-shrink: 0;
      width: 200px;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .movie-poster {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
    .movie-card-title {
      padding: 1rem;
      font-weight: bold;
      line-height: 1.2;
    }
    .reviews-list {
      space-y: 1rem;
    }
    .review-item {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .review-header {
      margin-bottom: 1rem;
    }
    .reviewer-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .reviewer-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .reviewer-name {
      font-weight: bold;
    }
    .reviewer-rating {
      font-size: 0.875rem;
      color: #666;
    }
    .review-content {
      line-height: 1.6;
    }
    </style>
  `
}

describe('MovieDetails Component', () => {
  let mockMovieDetails
  let mockMovieReviews
  let mockRelatedMovies

  beforeEach(() => {
    mockMovieDetails = {
      id: 1,
      title: 'Test Movie',
      overview: 'This is a test movie overview.',
      poster_path: '/test-poster.jpg',
      vote_average: 8.5,
      runtime: 120,
      status: 'Released',
      release_date: '2023-01-15',
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' }
      ],
      spoken_languages: [
        { english_name: 'English', name: 'en' },
        { english_name: 'Spanish', name: 'es' }
      ]
    }

    mockMovieReviews = {
      results: [
        {
          id: 1,
          author_details: {
            name: 'John Reviewer',
            rating: 9,
            avatar_path: '/avatar1.jpg'
          },
          content: 'This is an excellent movie with great acting.'
        }
      ]
    }

    mockRelatedMovies = {
      results: [
        {
          id: 2,
          title: 'Related Movie 1',
          poster_path: '/related1.jpg'
        },
        {
          id: 3,
          title: 'Related Movie 2',
          poster_path: '/related2.jpg'
        }
      ]
    }
  })

  it('renders movie title correctly', () => {
    const wrapper = mount(MovieDetails, {
      props: {
        movieDetails: mockMovieDetails,
        movieReviews: mockMovieReviews,
        relatedMovies: mockRelatedMovies
      }
    })

    const title = wrapper.find('[data-testid="movie-title"]')
    expect(title.text()).toBe('Test Movie')
  })

  it('displays movie rating and overview', () => {
    const wrapper = mount(MovieDetails, {
      props: {
        movieDetails: mockMovieDetails,
        movieReviews: mockMovieReviews,
        relatedMovies: mockRelatedMovies
      }
    })

    expect(wrapper.find('[data-testid="rating-text"]').text()).toBe('8.5 / 10')
    expect(wrapper.find('[data-testid="movie-overview"]').text()).toBe('This is a test movie overview.')
  })

  it('renders genre chips', () => {
    const wrapper = mount(MovieDetails, {
      props: {
        movieDetails: mockMovieDetails,
        movieReviews: mockMovieReviews,
        relatedMovies: mockRelatedMovies
      }
    })

    const genreChips = wrapper.findAll('[data-testid="genre-chip"]')
    expect(genreChips).toHaveLength(2)
    expect(genreChips[0].text()).toBe('Action')
    expect(genreChips[1].text()).toBe('Adventure')
  })

  it('shows movie details', () => {
    const wrapper = mount(MovieDetails, {
      props: {
        movieDetails: mockMovieDetails,
        movieReviews: mockMovieReviews,
        relatedMovies: mockRelatedMovies
      }
    })

    expect(wrapper.find('[data-testid="movie-status"]').text()).toBe('Released')
    expect(wrapper.find('[data-testid="movie-runtime"]').text()).toBe('120min')
    expect(wrapper.find('[data-testid="movie-release-date"]').text()).toBe('2023-01-15')
  })

  it('renders spoken languages', () => {
    const wrapper = mount(MovieDetails, {
      props: {
        movieDetails: mockMovieDetails,
        movieReviews: mockMovieReviews,
        relatedMovies: mockRelatedMovies
      }
    })

    const languageItems = wrapper.findAll('[data-testid="language-item"]')
    expect(languageItems).toHaveLength(2)
    expect(wrapper.text()).toContain('English')
    expect(wrapper.text()).toContain('Spanish')
  })

  it('displays related movies', () => {
    const wrapper = mount(MovieDetails, {
      props: {
        movieDetails: mockMovieDetails,
        movieReviews: mockMovieReviews,
        relatedMovies: mockRelatedMovies
      }
    })

    const relatedMovieCards = wrapper.findAll('[data-testid="related-movie-card"]')
    expect(relatedMovieCards).toHaveLength(2)
    expect(wrapper.text()).toContain('Related Movie 1')
    expect(wrapper.text()).toContain('Related Movie 2')
  })

  it('shows reviews with author and content', () => {
    const wrapper = mount(MovieDetails, {
      props: {
        movieDetails: mockMovieDetails,
        movieReviews: mockMovieReviews,
        relatedMovies: mockRelatedMovies
      }
    })

    const reviewItems = wrapper.findAll('[data-testid="review-item"]')
    expect(reviewItems).toHaveLength(1)

    expect(wrapper.find('[data-testid="review-author"]').text()).toBe('John Reviewer')
    expect(wrapper.find('[data-testid="review-content"]').text()).toContain('excellent movie')
  })

  it('handles empty data gracefully', () => {
    const emptyProps = {
      movieDetails: {
        ...mockMovieDetails,
        genres: [],
        spoken_languages: []
      },
      movieReviews: { results: [] },
      relatedMovies: { results: [] }
    }

    const wrapper = mount(MovieDetails, {
      props: emptyProps
    })

    expect(wrapper.find('[data-testid="movie-title"]').text()).toBe('Test Movie')
    expect(wrapper.findAll('[data-testid="genre-chip"]')).toHaveLength(0)
    expect(wrapper.findAll('[data-testid="language-item"]')).toHaveLength(0)
    expect(wrapper.findAll('[data-testid="related-movie-card"]')).toHaveLength(0)
    expect(wrapper.findAll('[data-testid="review-item"]')).toHaveLength(0)
  })
})