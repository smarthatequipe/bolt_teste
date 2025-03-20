// Função serverless para o Netlify
const { createRequestHandler } = require("@remix-run/netlify");
const path = require("path");

// Caminho para o build do servidor
const BUILD_DIR = path.join(process.cwd(), "build");

// Importar o build do servidor
const build = require(path.join(BUILD_DIR, "index.js"));

// Exportar o handler diretamente
exports.handler = function(event, context) {
  console.log("Iniciando função serverless em server.js");
  console.log("Caminho do build:", path.join(BUILD_DIR, "index.js"));
  
  const remixHandler = createRequestHandler({
    build,
    mode: process.env.NODE_ENV,
    getLoadContext() {
      return {
        netlifyEvent: event,
      };
    },
  });

  return remixHandler(event, context);
};
