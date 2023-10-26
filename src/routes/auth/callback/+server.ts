import { PUBLIC_COGNITO_CLIENT_ID, PUBLIC_BASE_URL, PUBLIC_COGNITO_BASE_URL } from '$env/static/public'

export async function GET({ url }) {
  const code = url.searchParams.get('code')

  if (!code) {
    // Handle error: no code in query params
    const badRequestResponse = new Response('No code provided', {
      status: 400
    })

    return badRequestResponse
  }

  const tokenEndpoint = `${PUBLIC_COGNITO_BASE_URL}/oauth2/token`

  const body = new URLSearchParams()
  body.append('grant_type', 'authorization_code')
  body.append('client_id', PUBLIC_COGNITO_CLIENT_ID)
  body.append('redirect_uri', `${PUBLIC_BASE_URL}/auth/callback`)
  body.append('code', code)

  try {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })

    const cognitoResponse = await response.json()

    if (!cognitoResponse.id_token || !cognitoResponse.access_token) {
      // Handle authentication error
      const authErrorResponse = new Response('Authentication error', {
        status: 500
      })

      return authErrorResponse
    }

    // Create Response object with Set-Cookie header
    // Note: HttpOnly is required for security reasons
    const authResponse = new Response('Authenticated', {
      status: 302,
      headers: {
        'Location': '/',
        'Set-Cookie': `id_token=${cognitoResponse.id_token}; HttpOnly; Path=/;, access_token=${cognitoResponse.access_token}; HttpOnly; Path=/;`,
      }
    })

    return authResponse
  } catch (error) {
    console.log(error)

    // Handle authentication error
    const authErrorResponse = new Response('Authentication error', {
      status: 500
    })

    return authErrorResponse
  }
}
