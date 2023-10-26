import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { PUBLIC_COGNITO_CLIENT_ID, PUBLIC_COGNITO_USER_POOL_ID } from '$env/static/public'

export const authUser = async (token: string) => {
  console.log('Checking token...')

  // Verifier that expects valid access tokens:
  const verifier = CognitoJwtVerifier.create({
    userPoolId: PUBLIC_COGNITO_USER_POOL_ID,
    tokenUse: 'id',
    clientId: PUBLIC_COGNITO_CLIENT_ID,
  })

  try {
    const payload = await verifier.verify(token)
    console.log('Token is valid. Payload:', payload)

    return payload
  } catch(e) {
    console.log('Token is invalid. Error:', e)
    throw e
  }
}
