import axios from 'axios'

let cachedToken = null
let tokenExpiry = null

export async function getShiprocketToken() {
  if (cachedToken && tokenExpiry > Date.now()) {
    return cachedToken
  }

  const res = await axios.post(
    'https://apiv2.shiprocket.in/v1/external/auth/login',
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    }
  )

  cachedToken = res.data.token
  tokenExpiry = Date.now() + 24 * 60 * 60 * 1000 // 24h

  return cachedToken
}