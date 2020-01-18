// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = "qfhcqu1jlh"
const region = "eu-central-1"
const stage = "dev"

const domain = "dev-9ncdqdat.eu.auth0.com"
const clientId = "dgbBMb1Mz1MAD9I9jBYKC3x7FfAJZRmD"
const callbackUrl = "http://localhost:1234/auth"

export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}`
// export const apiEndpoint = 'http://localhost:3000'

export const authConfig = {
  domain,
  clientId,
  callbackUrl
}
