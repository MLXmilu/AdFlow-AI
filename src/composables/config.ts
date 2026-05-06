export const AI_CONFIG = {
  baseURL: import.meta.env.VITE_MIMO_API_BASE_URL || '/api/mimo/v1',
  apiKey: import.meta.env.VITE_MIMO_API_KEY || '',
  model: import.meta.env.VITE_MIMO_MODEL || 'mimo-v2-pro',
}
