const API_BASE_URL = import.meta.env.DEV
  ? '/api/v1'
  : (import.meta.env.VITE_BACKEND_URL ?? '/api/v1')

export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${API_BASE_URL}/posts?` + new URLSearchParams(queryParams),
  )
  if (!res.ok) {
    const message = await res.text()
    throw new Error(message || `Failed to load posts (${res.status})`)
  }
  return await res.json()
}
export const createPost = async (token, post) => {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  if (!res.ok) {
    const message = await res.text()
    throw new Error(message || `Failed to create post (${res.status})`)
  }
  return await res.json()
}
