import { redirect } from '@sveltejs/kit'
import { PUBLIC_COGNITO_CLIENT_ID, PUBLIC_BASE_URL, PUBLIC_COGNITO_BASE_URL } from '$env/static/public'

export function load() {
  const cognitoClientId = PUBLIC_COGNITO_CLIENT_ID
  const callbackURL = `${PUBLIC_BASE_URL}/auth/callback`
  const cognitoHostedUiURL = `${PUBLIC_COGNITO_BASE_URL}/oauth2/authorize?response_type=code&client_id=${cognitoClientId}&redirect_uri=${callbackURL}`

  throw redirect(307, cognitoHostedUiURL)
}