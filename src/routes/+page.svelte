<script>
  import { goto } from '$app/navigation'
  import { PUBLIC_COGNITO_BASE_URL, PUBLIC_COGNITO_CLIENT_ID, PUBLIC_BASE_URL } from '$env/static/public'

  export let data
</script>

<h1>Welcome!</h1>
<p>You're authenticated as ({ data.user.email })</p>