# shopify-verify-app-proxy-middleware
Express middleware to verify that requests comes from your shopify app proxy.

## Installation
```
npm install shopify-verify-app-proxy-middleware
```

## Details
Shopify App Proxies allow you to verify that a request comes from your theme extension (e.g. app-block or embedded app-block)-
The app proxy intercepts the request from the theme extension and extends the query with the following properties
```json
{
  "extra": ["1", "2"],
  "shop": "shop-name.myshopify.com",
  "logged_in_customer_id" : 1,
  "path_prefix": "/apps/your-prefix",
  "timestamp": "1317327555",
  "signature": "signature using your SHOPIFY_API_SECRET as shared secret",
}
```
This package helps you verify the signature of the query in a middleware

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