// Função serverless para o Netlify
const { createRequestHandler } = require("@remix-run/netlify");
const path = require("path");

// Exportar o handler no formato que o Netlify espera
exports.handler = async (event, context) => {
  try {
    console.log("Iniciando função serverless Remix");
    
    // Verificar se o build do servidor existe
    const buildPath = path.join(process.cwd(), "build/server/index.js");
    console.log("Caminho do build:", buildPath);
    
    // Importar o build do servidor dinamicamente
    let build;
    try {
      build = require("../../build/server/index.js");
      console.log("Build importado com sucesso:", Object.keys(build));
    } catch (importError) {
      console.error("Erro ao importar o build:", importError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Erro ao importar o build do servidor",
          details: importError.message,
          stack: importError.stack
        })
      };
    }
    
    // Verificar se o build tem as propriedades necessárias
    if (!build || !build.entry || !build.routes) {
      console.error("Build inválido:", build);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Build do servidor inválido",
          buildKeys: build ? Object.keys(build) : "build is null" 
        })
      };
    }
    
    // Criar o handler do Remix
    console.log("Criando handler do Remix");
    const handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    });
    
    // Chamar o handler com o evento e contexto
    console.log("Chamando handler do Remix");
    return await handler(event, context);
  } catch (error) {
    console.error("Erro na função serverless:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Erro interno do servidor", 
        message: error.message,
        stack: error.stack
      })
    };
  }
};
