// Função serverless para o Netlify
const { createRequestHandler } = require("@remix-run/netlify");
const path = require("path");

// Caminho para o build do servidor
const BUILD_DIR = path.join(process.cwd(), "build");

// Importar o build do servidor
let serverBuild;
try {
  console.log("Tentando importar o build do servidor em server-handler.js");
  console.log("Caminho do build:", path.join(BUILD_DIR, "index.js"));
  serverBuild = require(path.join(BUILD_DIR, "index.js"));
  console.log("Build importado com sucesso:", Object.keys(serverBuild));
} catch (error) {
  console.error("Erro ao importar o build:", error);
}

// Exportar o handler no formato que o Netlify espera
exports.handler = async (event, context) => {
  try {
    if (!serverBuild) {
      console.error("Build do servidor não foi importado corretamente");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          error: "Erro ao importar o build do servidor",
          message: "O build do servidor não foi importado corretamente"
        })
      };
    }
    
    console.log("Criando handler do Remix em server-handler.js");
    const handler = createRequestHandler({
      build: serverBuild,
      mode: process.env.NODE_ENV
    });
    
    console.log("Chamando handler do Remix");
    return await handler(event, context);
  } catch (error) {
    console.error("Erro na função serverless:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: "Erro interno do servidor", 
        message: error.message,
        stack: error.stack
      })
    };
  }
};
