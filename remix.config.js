/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  ignoredRouteFiles: ["**/.*"],
  // Alterando o formato do módulo do servidor para CommonJS para melhor compatibilidade com o Netlify
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  serverMinify: false,
  serverBuildPath: "netlify/functions/server/index.js",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
