import { beforeAll, vi } from 'vitest'

// Mock environment variables
beforeAll(() => {
  // Set up default environment variables for testing
  process.env.NODE_ENV = 'test'
  process.env.DISCORD_TOKEN = 'test-discord-token'
  process.env.GITHUB_APP_ID = '12345'
  process.env.GITHUB_APP_INSTALLATION_ID = '67890'
  process.env.GITHUB_APP_PRIVATE_KEY_PEM = 'test-private-key'
  process.env.GITHUB_OWNER = 'test-owner'
  process.env.GITHUB_REPO = 'test-repo'
})

// Mock console methods to reduce noise in tests
Object.defineProperty(global, 'console', {
  value: {
    ...console,
    log: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
  writable: true,
})
