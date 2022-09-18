# shopify-verify-app-proxy-middleware
Express middleware to verify that requests comes from your shopify app proxy.

## Installation
```
npm install shopify-verify-app-proxy-middleware
```

## Example
``` ts
import express from "express"
import { createVerifyAppProxyMiddleware } from "shopify-verify-app-proxy-middleware"

const { SHOPIFY_API_SECRET } = process.env

const app = express()
const verifyAppProxyMiddleware = createVerifyAppProxyMiddleware(SHOPIFY_API_SECRET)

app.get("/route/used/by/your/storefront/theme-extension", verifyAppProxyMiddleware, async (req, res) => {
  // this request handler will only be hit if the incoming request is verified
})
```