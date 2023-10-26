import { authUser } from '$lib/utils'
import type { Handle } from '@sveltejs/kit'

// Unauthorized response
const unauthorizedResponse = new Response('Unauthorized', {
  status: 401
})

// Login redirect
const loginRedirectResponse = new Response('Unauthorized', {
  status: 302,
  headers: {
    'Location': '/login'
  }
})

// Bad request response
const badRequestResponse = new Response('Bad request', {
  status: 400
})

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = event.request.headers.get('Cookie') || ''

  // Extract the token from the cookies
  const token = cookies.split(';').find((cookie) => cookie.trim().startsWith('id_token='))?.split('=')[1]

  if (!token && !event.locals.userJwtPayload) {
    console.log("User not authenticated...")

    // Allow login & callback pages to be accessed
    if(event.url.pathname.startsWith("/login") || event.url.pathname.startsWith("/auth/callback")){
      return await resolve(event)
    }

    return loginRedirectResponse
  }

  if(!token){
    console.log("No token found...")

    return badRequestResponse
  }

  try {
    // Verify the token
    const payload = await authUser(token)

    // Add the user to the context
    event.locals.userJwtPayload = payload
  } catch (error) {
    console.log("Auth error occurred...", error)

    // Handle unauthorized requests
    return unauthorizedResponse
  }

  return await resolve(event)
}
