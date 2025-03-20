// Função serverless para o Netlify
const { createRequestHandler } = require("@remix-run/netlify");
const path = require("path");

// Caminho para o build do servidor
const BUILD_DIR = path.join(process.cwd(), "build");

// Exportar o handler diretamente
exports.handler = async function(event, context) {
  console.log("Iniciando função serverless em server.js");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("Caminho do build:", path.join(BUILD_DIR, "index.js"));
  
  try {
    // Importar o build do servidor
    let build;
    try {
      build = require(path.join(BUILD_DIR, "index.js"));
      console.log("Build importado com sucesso:", Object.keys(build));
    } catch (importError) {
      console.error("Erro ao importar o build:", importError);
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          error: "Erro ao importar o build do servidor",
          message: importError.message,
          stack: importError.stack,
          require_paths: module.paths
        })
      };
    }
    
    // Criar o handler do Remix
    console.log("Criando handler do Remix");
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
    console.log("Chamando handler do Remix");
    return await remixHandler(event, context);
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
