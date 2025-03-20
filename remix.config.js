/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // Alterando o formato do módulo do servidor para CommonJS para melhor compatibilidade com o Netlify
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  serverMinify: false,
  serverBuildPath: "build/index.js",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
