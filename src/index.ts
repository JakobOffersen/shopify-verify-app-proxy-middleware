import { verifyAppProxySignature, transformRecordToSortedKeyValueString } from "shopify-verify-app-proxy"
import { Request, Response, NextFunction } from "express"

type ReqQuery = { [key: string]: undefined | string | string[] | ReqQuery | ReqQuery[] }

export const createVerifyAppProxyMiddleware = (shopifyAPISecret: string) => {
  return (req: Request<unknown, unknown, unknown, ReqQuery>, _: Response, next: NextFunction) => {
    const { signature, ...rest } = req.query
    const data = transformRecordToSortedKeyValueString(rest)
    const verified = verifyAppProxySignature(signature as string ?? "", shopifyAPISecret, data)

    if (!verified) throw new Error("The requested endpoint is not allowed. Invalid signature.")

    next()
  }
}

