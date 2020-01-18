import { APIGatewayProxyEvent } from 'aws-lambda'
import { decode } from 'jsonwebtoken'

import { JwtToken } from '../../auth/JwtToken'

export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const decodedJwt = decode(split[1]) as JwtToken

  return decodedJwt.sub;
}
