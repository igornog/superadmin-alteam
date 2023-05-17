export const authHeader = () => {
  const userTokenStorage = localStorage.getItem('alt_user_token')
  const user_token: string = userTokenStorage
    ? JSON.parse(userTokenStorage)
    : null

  if (user_token) {
    return { Authorization: 'Bearer ' + user_token }
  } else {
    return {}
  }
}
