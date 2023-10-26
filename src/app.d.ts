// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      userJwtPayload: CognitoIdTokenPayload
    }
  }
}

export {}
