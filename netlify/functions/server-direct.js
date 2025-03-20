// Função serverless para o Netlify baseada no exemplo oficial do Remix
const path = require("path");
const { createRequestHandler } = require("@remix-run/netlify");

// Caminho para o build do servidor
const BUILD_DIR = path.join(process.cwd(), "build");

// Exportar o handler no formato que o Netlify espera
exports.handler = async (event, context) => {
  try {
    // Importar o build do servidor
    const build = require(path.join(BUILD_DIR, "index.js"));
    
    // Criar o handler do Remix
    const handleRequest = createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    });
    
    // Chamar o handler com o evento e contexto
    return await handleRequest(event, context);
  } catch (error) {
    console.error("Erro na função serverless:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        error: "Erro interno do servidor", 
        message: error.message,
        stack: error.stack
      })
    };
  }
};
