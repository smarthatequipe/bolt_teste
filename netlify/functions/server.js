// Abordagem CommonJS para garantir compatibilidade com o Netlify
const { createRequestHandler } = require("@remix-run/netlify");
const path = require("path");

// Exportar o handler diretamente como uma função nomeada
exports.handler = async (event, context) => {
  // Importar o build dinamicamente para garantir que ele seja carregado corretamente
  const build = await import(path.join(process.cwd(), "build/server/index.js"));
  
  // Criar o handler do Remix
  const remixHandler = createRequestHandler({
    build,
    mode: process.env.NODE_ENV,
    getLoadContext() {
      return {
        netlifyEvent: event,
      };
    },
  });

  // Chamar o handler com o evento e contexto
  return remixHandler(event, context);
};
