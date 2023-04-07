const { createProxyMiddleware } = require("http-proxy-middleware");

const mongoProxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_MONGO_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/quotes": "",
  },
});

module.exports = mongoProxy;
