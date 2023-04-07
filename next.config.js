/** @type {import('next').NextConfig} */
const mongoProxy = require("./mongoProxy");
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  async middleware() {
    return [mongoProxy];
  },
};
