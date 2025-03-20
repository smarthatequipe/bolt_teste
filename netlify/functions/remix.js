// Função serverless para o Netlify
const { createRequestHandler } = require("@remix-run/netlify");

// Exportar o handler no formato que o Netlify espera
exports.handler = async (event, context) => {
  try {
    // Importar o build do servidor dinamicamente
    const build = require("../../build/server/index.js");
    
    // Criar o handler do Remix
    const handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    });
    
    // Retornar a resposta do handler
    return await handler(event, context);
  } catch (error) {
    console.error("Erro na função serverless:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno do servidor" })
    };
  }
};
