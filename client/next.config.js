/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  plugins:
    [new MiniCssExtractPlugin()]

  ,
  reactStrictMode: false,

}
