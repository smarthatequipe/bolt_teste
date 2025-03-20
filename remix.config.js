/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.js",
  serverBuildPath: "netlify/functions/server/index.js",
  serverModuleFormat: "esm",
  serverPlatform: "node",
  serverMinify: false,
};
