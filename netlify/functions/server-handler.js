// Função serverless para o Netlify
const { createRequestHandler } = require("@remix-run/netlify");
const path = require("path");

// Importar o build do servidor
const serverBuild = require("../functions/server/index.js");

// Exportar o handler diretamente
exports.handler = function(event, context) {
  const remixHandler = createRequestHandler({
    build: serverBuild,
    mode: process.env.NODE_ENV,
    getLoadContext() {
      return {
        netlifyEvent: event,
      };
    },
  });

  return remixHandler(event, context);
};
