// Função serverless para o Netlify baseada no exemplo oficial do Remix
const path = require("path");
const { createRequestHandler } = require("@remix-run/netlify");

// Caminho para o build do servidor
const BUILD_DIR = path.join(process.cwd(), "build");

// Exportar o handler no formato que o Netlify espera
exports.handler = async (event, context) => {
  try {
    console.log("Iniciando função serverless Remix");
    console.log("Caminho do build:", BUILD_DIR);
    
    // Importar o build do servidor
    let build;
    try {
      build = require(path.join(BUILD_DIR, "index.js"));
      console.log("Build importado com sucesso:", Object.keys(build));
    } catch (importError) {
      console.error("Erro ao importar o build:", importError);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          error: "Erro ao importar o build do servidor",
          details: importError.message,
          stack: importError.stack
        })
      };
    }
    
    // Criar o handler do Remix
    console.log("Criando handler do Remix");
    const handleRequest = createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    });
    
    // Chamar o handler com o evento e contexto
    console.log("Chamando handler do Remix");
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
