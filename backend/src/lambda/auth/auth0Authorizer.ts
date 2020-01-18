import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import { verify } from 'jsonwebtoken'
import Axios from 'axios'

import logger from '../../utils/logger'
import { JwtToken } from '../../auth/JwtToken'

let certificate;
const jwksUrl: string = process.env.AUTH0_CERTIFICATE_URL || "";

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken as string)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function chunk(str: string, limit) {
  var chunks: string[] = [];
  var i: number;
  var len: number = str.length;

  for(i = 0; i < len; i += limit) {
    chunks.push(str.substr(i, limit))
  }

  return chunks
};

async function verifyToken(authHeader: string): Promise<JwtToken>{
  const token = getToken(authHeader)

  if(!certificate) {
    const {data} = await Axios.get(jwksUrl)
    certificate = "-----BEGIN CERTIFICATE-----\n" +
      chunk(data.keys[0]["x5c"][0], 64).join("\n") +
      "\n-----END CERTIFICATE-----"
  }

  return verify(token, certificate, { algorithms: ['RS256']}) as JwtToken
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
