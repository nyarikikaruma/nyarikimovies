import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'

// Mock ResizeObserver for Vuetify components
config.global.ResizeObserver = ResizeObserver

// Mock IntersectionObserver
config.global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Global test configuration
config.global.stubs = {
  NuxtLink: true,
  ClientOnly: true,
}