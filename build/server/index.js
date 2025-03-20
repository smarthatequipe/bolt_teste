import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "bg-white shadow-md py-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 flex flex-col md:flex-row justify-between items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center mb-4 md:mb-0", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/logo-light.png",
          alt: "Fitness Hub",
          className: "h-10 mr-3"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-blue-600", children: "Fitness Hub" })
    ] }) }),
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-wrap justify-center space-x-6", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "text-gray-700 hover:text-blue-600 font-medium",
          children: "Home"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/blog",
          className: "text-gray-700 hover:text-blue-600 font-medium",
          children: "Blog"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/contato",
          className: "text-gray-700 hover:text-blue-600 font-medium",
          children: "Contato"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/termos",
          className: "text-gray-700 hover:text-blue-600 font-medium",
          children: "Termos"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/privacidade",
          className: "text-gray-700 hover:text-blue-600 font-medium",
          children: "Privacidade"
        }
      ) })
    ] }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-800 text-white pt-12 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4", children: "Fitness Hub" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-4", children: "Soluções de marketing digital para academias e profissionais de fitness." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-300 hover:text-white", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsx("a", { href: "https://instagram.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-300 hover:text-white", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsx("a", { href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-300 hover:text-white", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4", children: "Links Rápidos" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-300 hover:text-white", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", className: "text-gray-300 hover:text-white", children: "Blog" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contato", className: "text-gray-300 hover:text-white", children: "Contato" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/termos", className: "text-gray-300 hover:text-white", children: "Termos de Adesão" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/privacidade", className: "text-gray-300 hover:text-white", children: "Política de Privacidade" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4", children: "Contato" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 mt-0.5 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-300", children: [
              "Av. Paulista, 1000",
              /* @__PURE__ */ jsx("br", {}),
              "São Paulo, SP",
              /* @__PURE__ */ jsx("br", {}),
              "CEP: 01310-100"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
            /* @__PURE__ */ jsx("a", { href: "mailto:contato@fitnesshub.com.br", className: "text-gray-300 hover:text-white", children: "contato@fitnesshub.com.br" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
            /* @__PURE__ */ jsx("a", { href: "tel:+551199999999", className: "text-gray-300 hover:text-white", children: "(11) 9999-9999" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4", children: "Horário de Atendimento" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Segunda a Sexta: 9h às 18h" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "Sábado: 9h às 13h" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-700 mt-10 pt-8", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-gray-400", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Fitness Hub. Todos os direitos reservados."
    ] }) })
  ] }) });
}
const tailwindStylesheetUrl = "/assets/tailwind-DjZO96XN.css";
const links = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-grow", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const meta$5 = () => {
  return [
    { title: "Política de Privacidade - Fitness Hub" },
    { name: "description", content: "Política de privacidade da Fitness Hub" }
  ];
};
function Privacidade() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8 text-center", children: "Política de Privacidade" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "A Fitness Hub valoriza a privacidade de seus usuários e está comprometida em proteger suas informações pessoais. Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos suas informações quando você utiliza nossos serviços." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "1. Informações que Coletamos" }),
      /* @__PURE__ */ jsx("p", { children: "Podemos coletar os seguintes tipos de informações:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mb-4", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Informações de Identificação Pessoal:" }),
          " Nome, endereço de e-mail, número de telefone, endereço postal e outras informações que você nos fornece voluntariamente."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Informações de Uso:" }),
          " Dados sobre como você interage com nossos serviços, incluindo páginas visitadas, tempo gasto no site, links clicados e preferências de navegação."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Informações do Dispositivo:" }),
          " Tipo de dispositivo, sistema operacional, tipo de navegador, configurações de idioma e outras informações técnicas."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Informações de Localização:" }),
          " Dados sobre sua localização geográfica, que podem ser precisos (como GPS) ou menos precisos (como cidade ou país)."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Cookies e Tecnologias Semelhantes:" }),
          " Utilizamos cookies e tecnologias semelhantes para coletar informações sobre sua atividade, navegador e dispositivo."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "2. Como Usamos Suas Informações" }),
      /* @__PURE__ */ jsx("p", { children: "Utilizamos as informações coletadas para:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Fornecer, manter e melhorar nossos serviços;" }),
        /* @__PURE__ */ jsx("li", { children: "Processar transações e enviar notificações relacionadas;" }),
        /* @__PURE__ */ jsx("li", { children: "Enviar comunicações de marketing, atualizações e informações promocionais;" }),
        /* @__PURE__ */ jsx("li", { children: "Personalizar sua experiência e fornecer conteúdo e ofertas relevantes;" }),
        /* @__PURE__ */ jsx("li", { children: "Analisar tendências de uso e otimizar nossos serviços;" }),
        /* @__PURE__ */ jsx("li", { children: "Detectar, prevenir e resolver problemas técnicos e de segurança;" }),
        /* @__PURE__ */ jsx("li", { children: "Cumprir obrigações legais e regulatórias." })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "3. Compartilhamento de Informações" }),
      /* @__PURE__ */ jsx("p", { children: "Podemos compartilhar suas informações nas seguintes circunstâncias:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mb-4", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Com Prestadores de Serviços:" }),
          " Compartilhamos informações com empresas que nos auxiliam na operação de nossos serviços, como processamento de pagamentos, análise de dados, entrega de e-mails, hospedagem e serviços de atendimento ao cliente."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Para Conformidade Legal:" }),
          " Podemos divulgar informações quando acreditamos de boa-fé que a divulgação é necessária para cumprir a lei, proteger nossos direitos ou responder a um processo legal."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Em Caso de Transferência de Negócios:" }),
          " Se a Fitness Hub estiver envolvida em uma fusão, aquisição ou venda de ativos, suas informações podem ser transferidas como parte dessa transação."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Com Seu Consentimento:" }),
          " Podemos compartilhar suas informações com terceiros quando você nos autorizar a fazê-lo."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "4. Segurança das Informações" }),
      /* @__PURE__ */ jsx("p", { children: "Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações contra acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro, e não podemos garantir sua segurança absoluta." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "5. Seus Direitos e Escolhas" }),
      /* @__PURE__ */ jsx("p", { children: "Você tem certos direitos em relação às suas informações pessoais:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Acessar, corrigir ou excluir suas informações pessoais;" }),
        /* @__PURE__ */ jsx("li", { children: "Opor-se ao processamento de suas informações;" }),
        /* @__PURE__ */ jsx("li", { children: "Restringir o processamento de suas informações;" }),
        /* @__PURE__ */ jsx("li", { children: "Solicitar a portabilidade de suas informações;" }),
        /* @__PURE__ */ jsx("li", { children: "Optar por não receber comunicações de marketing." })
      ] }),
      /* @__PURE__ */ jsx("p", { children: 'Para exercer esses direitos, entre em contato conosco através dos dados fornecidos na seção "Contato" abaixo.' }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "6. Retenção de Dados" }),
      /* @__PURE__ */ jsx("p", { children: "Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "7. Crianças" }),
      /* @__PURE__ */ jsx("p", { children: "Nossos serviços não são direcionados a pessoas menores de 18 anos, e não coletamos intencionalmente informações pessoais de crianças. Se você é pai ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos tomar as medidas apropriadas." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "8. Alterações nesta Política" }),
      /* @__PURE__ */ jsx("p", { children: "Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas de informação. Recomendamos que você revise esta política regularmente para estar ciente de quaisquer alterações. A data da última atualização será indicada no final desta política." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "9. Contato" }),
      /* @__PURE__ */ jsx("p", { children: "Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre nossas práticas de privacidade, entre em contato conosco pelo e-mail: privacidade@fitnesshub.com.br" }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-gray-600", children: "Última atualização: 15 de Agosto de 2023" })
    ] }) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Privacidade,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const authors = {
  joaoSilva: {
    name: "João Silva",
    title: "Especialista em Marketing Digital para Academias",
    bio: "João Silva é especialista em marketing digital com mais de 10 anos de experiência no mercado fitness. Formado em Marketing pela USP, com MBA em Marketing Digital pela FGV, já ajudou mais de 200 academias a aumentarem seu faturamento através de estratégias digitais eficientes.",
    avatar: "https://placehold.co/200x200/blue/white?text=JS",
    url: "/sobre/joao-silva",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/joaosilva" },
      { platform: "Instagram", url: "https://instagram.com/joaosilva" },
      { platform: "Twitter", url: "https://twitter.com/joaosilva" }
    ]
  },
  mariaOliveira: {
    name: "Maria Oliveira",
    title: "Consultora de Redes Sociais para o Mercado Fitness",
    bio: "Maria Oliveira é consultora especializada em estratégias de redes sociais para o mercado fitness. Com formação em Comunicação Digital e certificação em Social Media Marketing, Maria já gerenciou campanhas para mais de 50 academias e estúdios de fitness em todo o Brasil.",
    avatar: "https://placehold.co/200x200/blue/white?text=MO",
    url: "/sobre/maria-oliveira",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/mariaoliveira" },
      { platform: "Instagram", url: "https://instagram.com/mariaoliveira" }
    ]
  }
};
const categories = {
  marketingDigital: {
    name: "Marketing Digital",
    slug: "marketing-digital"
  },
  redesSociais: {
    name: "Redes Sociais",
    slug: "redes-sociais"
  },
  retencaoClientes: {
    name: "Retenção de Clientes",
    slug: "retencao-clientes"
  }
};
const blogPosts = [
  {
    title: "5 Estratégias de Marketing Digital para Academias em 2023",
    slug: "estrategias-marketing-digital-academias-2023",
    metaDescription: "Descubra as 5 estratégias de marketing digital mais eficazes para academias em 2023 e aumente sua base de clientes e faturamento.",
    excerpt: "Descubra as principais tendências e estratégias que estão ajudando academias a crescer no ambiente digital.",
    publishedDate: "2023-08-15T10:00:00Z",
    updatedDate: "2023-08-20T14:30:00Z",
    image: "https://placehold.co/800x450/blue/white?text=Marketing+Digital",
    imageAlt: "Pessoa analisando métricas de marketing digital para academia em um computador",
    imageCaption: "O marketing digital é essencial para o crescimento de academias no cenário atual",
    categories: [categories.marketingDigital, categories.redesSociais],
    author: authors.joaoSilva,
    introduction: `
      <p>O mercado fitness está mais competitivo do que nunca. Com o aumento da conscientização sobre saúde e bem-estar, mais pessoas estão buscando academias e serviços fitness, mas também há mais opções disponíveis para elas escolherem.</p>
      <p>Neste cenário, ter uma estratégia de marketing digital eficiente não é mais um diferencial, mas uma necessidade para academias que desejam se destacar e atrair novos alunos. Neste artigo, vamos explorar as 5 estratégias de marketing digital mais eficazes para academias em 2023.</p>
    `,
    content: `
      <h2 id="presenca-google">1. Fortaleça sua presença no Google</h2>
      <p>Quando alguém busca por "academia perto de mim" ou "melhor academia em [sua cidade]", você quer que seu negócio apareça nos primeiros resultados, certo? Para isso, é fundamental:</p>
      <ul>
        <li><strong>Otimizar seu Google Meu Negócio:</strong> Mantenha todas as informações atualizadas, adicione fotos de qualidade das instalações, responda às avaliações e publique novidades regularmente.</li>
        <li><strong>Investir em SEO local:</strong> Otimize seu site para palavras-chave locais relevantes e construa backlinks de qualidade de sites locais.</li>
        <li><strong>Considerar o Google Ads:</strong> Anúncios pagos podem complementar seus esforços orgânicos, especialmente para termos de busca competitivos.</li>
      </ul>
      
      <h2 id="conteudo-relevante">2. Crie conteúdo relevante e educativo</h2>
      <p>O conteúdo é a base de qualquer estratégia de marketing digital bem-sucedida. Para academias, isso significa:</p>
      <ul>
        <li><strong>Blog com dicas de treino e nutrição:</strong> Compartilhe conhecimento valioso que ajude seus alunos (e potenciais alunos) a alcançarem seus objetivos.</li>
        <li><strong>Vídeos demonstrativos:</strong> Mostre a execução correta de exercícios, tours pelas instalações e depoimentos de alunos.</li>
        <li><strong>E-books e guias:</strong> Ofereça conteúdos mais aprofundados em troca de leads (emails).</li>
      </ul>
      <p>Lembre-se: o objetivo é posicionar sua academia como uma autoridade no assunto e construir confiança com seu público.</p>
      
      <h2 id="redes-sociais">3. Domine as redes sociais</h2>
      <p>As redes sociais são canais poderosos para academias, pois permitem mostrar resultados, criar comunidade e engajar com o público. Algumas dicas:</p>
      <ul>
        <li><strong>Instagram:</strong> Compartilhe fotos e vídeos de treinos, transformações de alunos (com autorização) e bastidores da academia.</li>
        <li><strong>Facebook:</strong> Ideal para eventos, promoções e conteúdos mais longos.</li>
        <li><strong>TikTok:</strong> Perfeito para vídeos curtos e dinâmicos que mostram exercícios, dicas rápidas ou momentos divertidos.</li>
      </ul>
      <p>A consistência é chave: mantenha um calendário de postagens e interaja regularmente com seus seguidores.</p>
      
      <h2 id="email-marketing">4. Implemente uma estratégia de email marketing</h2>
      <p>O email marketing continua sendo uma das formas mais eficazes de converter leads e fidelizar clientes. Para academias, recomendamos:</p>
      <ul>
        <li><strong>Sequência de boas-vindas:</strong> Para novos alunos, explicando como aproveitar ao máximo a academia.</li>
        <li><strong>Newsletter regular:</strong> Com dicas de treino, nutrição, novidades da academia e histórias inspiradoras.</li>
        <li><strong>Campanhas de reativação:</strong> Para ex-alunos, com ofertas especiais para retornarem.</li>
      </ul>
      <p>Personalize suas mensagens sempre que possível e segmente sua lista para enviar conteúdo mais relevante para cada grupo.</p>
      
      <h2 id="whatsapp-marketing">5. Utilize o WhatsApp Marketing</h2>
      <p>O WhatsApp se tornou uma ferramenta essencial para negócios no Brasil, e academias podem aproveitá-lo de várias formas:</p>
      <ul>
        <li><strong>Atendimento ao cliente:</strong> Responda dúvidas, agende aulas experimentais e resolva problemas rapidamente.</li>
        <li><strong>Grupos de suporte:</strong> Crie grupos para diferentes modalidades ou objetivos, onde os alunos possam se motivar mutuamente.</li>
        <li><strong>Listas de transmissão:</strong> Envie novidades, dicas e promoções para alunos que optaram por receber esse tipo de conteúdo.</li>
      </ul>
      <p>Lembre-se de respeitar a privacidade dos seus contatos e não enviar mensagens em excesso.</p>
      
      <h3 id="casos-sucesso">Casos de Sucesso</h3>
      <p>Para ilustrar a eficácia dessas estratégias, vamos analisar brevemente dois casos de sucesso:</p>
      
      <h4>Academia Forma Fitness</h4>
      <p>A Academia Forma Fitness, localizada em São Paulo, implementou uma estratégia focada em conteúdo e SEO local. Em apenas 6 meses, conseguiram:</p>
      <ul>
        <li>Aumentar o tráfego orgânico do site em 150%</li>
        <li>Dobrar o número de leads gerados pelo Google Meu Negócio</li>
        <li>Aumentar em 30% o número de matrículas provenientes de canais digitais</li>
      </ul>
      
      <h4>Estúdio Vida Ativa</h4>
      <p>O Estúdio Vida Ativa, especializado em treinamento funcional, apostou nas redes sociais e WhatsApp Marketing. Os resultados após 3 meses foram:</p>
      <ul>
        <li>Crescimento de 200% no engajamento no Instagram</li>
        <li>Taxa<boltArtifact id="blog-post-structure-continued" title="Blog Post Structure with SEO and E-E-A-T Optimization (Continued)">
<boltAction type="file" filePath="app/data/blogPosts.ts">        <li>Taxa de conversão de 40% nas campanhas de WhatsApp</li>
        <li>Aumento de 25% na retenção de alunos</li>
      </ul>
    `,
    conclusion: `
      <p>Implementar uma estratégia de marketing digital eficaz pode transformar os resultados da sua academia. As cinco estratégias que discutimos neste artigo - fortalecer sua presença no Google, criar conteúdo relevante, dominar as redes sociais, implementar email marketing e utilizar o WhatsApp Marketing - formam uma base sólida para atrair novos alunos e fidelizar os atuais.</p>
      <p>Lembre-se que o marketing digital é um processo contínuo que exige consistência e adaptação. Monitore seus resultados, teste diferentes abordagens e esteja sempre atento às novas tendências e ferramentas que surgem.</p>
      <p>Sua academia está implementando alguma dessas estratégias? Compartilhe nos comentários suas experiências e resultados!</p>
    `,
    tableOfContents: [
      { id: "presenca-google", title: "Fortaleça sua presença no Google" },
      { id: "conteudo-relevante", title: "Crie conteúdo relevante e educativo" },
      { id: "redes-sociais", title: "Domine as redes sociais" },
      { id: "email-marketing", title: "Implemente uma estratégia de email marketing" },
      { id: "whatsapp-marketing", title: "Utilize o WhatsApp Marketing" },
      { id: "casos-sucesso", title: "Casos de Sucesso" }
    ],
    relatedPosts: [
      {
        title: "Como Usar as Redes Sociais para Atrair Novos Alunos",
        slug: "redes-sociais-atrair-alunos",
        excerpt: "Um guia completo sobre como utilizar Instagram, Facebook e TikTok para promover sua academia.",
        image: "https://placehold.co/600x400/blue/white?text=Redes+Sociais"
      },
      {
        title: "Email Marketing para Academias: Guia Completo",
        slug: "email-marketing-academias",
        excerpt: "Como criar campanhas de email eficazes para converter leads, recuperar ex-alunos e fidelizar sua base atual.",
        image: "https://placehold.co/600x400/blue/white?text=Email+Marketing"
      },
      {
        title: "SEO Local: Como Aparecer nas Buscas da sua Região",
        slug: "seo-local-academias",
        excerpt: "Estratégias para otimizar sua presença online e aparecer nos resultados de busca para potenciais clientes da sua região.",
        image: "https://placehold.co/600x400/blue/white?text=SEO+Local"
      }
    ],
    comments: [
      {
        author: {
          name: "Carlos Mendes",
          email: "carlos@exemplo.com"
        },
        date: "2023-08-16T15:30:00Z",
        content: "Excelente artigo! Implementamos a estratégia de WhatsApp Marketing na nossa academia e os resultados foram surpreendentes. A taxa de resposta é muito maior do que por email."
      },
      {
        author: {
          name: "Ana Paula",
          email: "ana@exemplo.com"
        },
        date: "2023-08-17T10:15:00Z",
        content: "Gostaria de saber mais sobre como criar uma estratégia de conteúdo eficaz para Instagram. Vocês têm algum artigo específico sobre isso?"
      }
    ]
  },
  {
    title: "Como Usar as Redes Sociais para Atrair Novos Alunos",
    slug: "redes-sociais-atrair-alunos",
    metaDescription: "Aprenda estratégias eficazes para usar Instagram, Facebook e TikTok para atrair novos alunos para sua academia e aumentar seu engajamento online.",
    excerpt: "Um guia completo sobre como utilizar Instagram, Facebook e TikTok para promover sua academia.",
    publishedDate: "2023-08-10T09:00:00Z",
    image: "https://placehold.co/800x450/blue/white?text=Redes+Sociais",
    imageAlt: "Smartphone mostrando perfis de redes sociais de uma academia",
    categories: [categories.redesSociais, categories.marketingDigital],
    author: authors.mariaOliveira,
    introduction: `
      <p>As redes sociais transformaram a maneira como as academias se comunicam com seu público. Hoje, mais do que nunca, é essencial ter uma presença forte e estratégica nas principais plataformas para atrair novos alunos e engajar os atuais.</p>
      <p>Neste guia completo, vamos explorar como utilizar Instagram, Facebook e TikTok de forma eficaz para promover sua academia, aumentar sua visibilidade online e, o mais importante, converter seguidores em alunos.</p>
    `,
    content: `
      <h2 id="estrategia-instagram">Estratégias para Instagram</h2>
      <p>O Instagram é provavelmente a rede social mais importante para academias atualmente. Com seu formato visual e recursos interativos, oferece inúmeras possibilidades para mostrar sua academia e engajar com potenciais alunos.</p>
      
      <h3>Conteúdos que funcionam no Instagram:</h3>
      <ul>
        <li><strong>Reels com demonstrações de exercícios:</strong> Vídeos curtos mostrando a execução correta de exercícios são extremamente populares.</li>
        <li><strong>Stories mostrando o dia a dia da academia:</strong> Compartilhe momentos autênticos, aulas em grupo, novos equipamentos, etc.</li>
        <li><strong>Posts com antes e depois:</strong> Transformações de alunos (com autorização) são poderosos motivadores.</li>
        <li><strong>Dicas rápidas de treino e nutrição:</strong> Conteúdo educativo que agrega valor para seus seguidores.</li>
        <li><strong>Lives com profissionais da academia:</strong> Sessões de perguntas e respostas, aulas experimentais online, etc.</li>
      </ul>
      
      <h3>Dicas para otimizar seu perfil no Instagram:</h3>
      <ul>
        <li>Use uma bio clara que explique o que sua academia oferece e inclua um call-to-action.</li>
        <li>Adicione um link na bio para seu site ou uma página de captura de leads.</li>
        <li>Utilize hashtags relevantes e locais para aumentar seu alcance.</li>
        <li>Mantenha uma identidade visual consistente em todos os posts.</li>
        <li>Responda comentários e mensagens prontamente.</li>
      </ul>
      
      <h2 id="estrategia-facebook">Estratégias para Facebook</h2>
      <p>Embora muitos considerem o Facebook menos relevante para o público jovem, ele ainda é uma plataforma poderosa, especialmente para alcançar um público mais maduro e para recursos específicos como grupos e eventos.</p>
      
      <h3>Como aproveitar o Facebook ao máximo:</h3>
      <ul>
        <li><strong>Grupos de comunidade:</strong> Crie um grupo para seus alunos compartilharem experiências, dúvidas e conquistas.</li>
        <li><strong>Eventos:</strong> Promova aulões especiais, workshops e outros eventos da sua academia.</li>
        <li><strong>Facebook Ads:</strong> Utilize a poderosa plataforma de anúncios para alcançar potenciais alunos na sua região.</li>
        <li><strong>Conteúdo mais longo:</strong> O Facebook permite textos mais extensos, ideal para compartilhar histórias inspiradoras e artigos informativos.</li>
      </ul>
      
      <h2 id="estrategia-tiktok">Estratégias para TikTok</h2>
      <p>O TikTok é a rede social que mais cresce atualmente e oferece um enorme potencial para academias que querem alcançar um público mais jovem e surfar nas tendências do momento.</p>
      
      <h3>Como criar conteúdo viral no TikTok:</h3>
      <ul>
        <li><strong>Desafios fitness:</strong> Crie ou participe de desafios relacionados a fitness que estão em alta.</li>
        <li><strong>Transformações rápidas:</strong> Vídeos de antes e depois com transições criativas.</li>
        <li><strong>Dicas rápidas e surpreendentes:</strong> Compartilhe "hacks" de treino que geram curiosidade.</li>
        <li><strong>Bastidores divertidos:</strong> Mostre o lado mais descontraído da sua academia.</li>
        <li><strong>Duetos com criadores fitness populares:</strong> Aproveite o alcance de influenciadores da área.</li>
      </ul>
      
      <h2 id="calendario-conteudo">Criando um Calendário de Conteúdo Eficaz</h2>
      <p>Um dos maiores desafios para academias nas redes sociais é manter a consistência. Por isso, criar um calendário de conteúdo é essencial:</p>
      
      <h3>Exemplo de calendário semanal:</h3>
      <ul>
        <li><strong>Segunda-feira:</strong> Motivação para começar a semana (frases inspiradoras, depoimentos de alunos).</li>
        <li><strong>Terça-feira:</strong> Dicas técnicas de treino (demonstração de exercícios, correções de postura).</li>
        <li><strong>Quarta-feira:</strong> Conteúdo sobre nutrição (receitas saudáveis, dicas de alimentação).</li>
        <li><strong>Quinta-feira:</strong> Bastidores da academia (equipe, instalações, novidades).</li>
        <li><strong>Sexta-feira:</strong> Conteúdo interativo (enquetes, perguntas, desafios para o fim de semana).</li>
        <li><strong>Sábado:</strong> Transformações e resultados de alunos.</li>
        <li><strong>Domingo:</strong> Conteúdo educativo mais aprofundado ou reflexivo.</li>
      </ul>
      
      <h2 id="estrategia-anuncios">Estratégia de Anúncios Pagos</h2>
      <p>Para acelerar seus resultados, considere investir em anúncios pagos nas redes sociais:</p>
      
      <h3>Tipos de campanhas eficazes para academias:</h3>
      <ul>
        <li><strong>Promoção de aula experimental gratuita:</strong> Ideal para atrair novos leads.</li>
        <li><strong>Ofertas para matrículas:</strong> Descontos ou condições especiais por tempo limitado.</li>
        <li><strong>Remarketing para visitantes do site:</strong> Alcance pessoas que já demonstraram interesse.</li>
        <li><strong>Campanhas locais:</strong> Focadas em pessoas que moram ou trabalham próximo à sua academia.</li>
      </ul>
      
      <h2 id="metricas-acompanhar">Métricas Importantes para Acompanhar</h2>
      <p>Para saber se sua estratégia está funcionando, monitore regularmente estas métricas:</p>
      
      <ul>
        <li><strong>Taxa de engajamento:</strong> Comentários, curtidas e compartilhamentos em relação ao número de seguidores.</li>
        <li><strong>Taxa de crescimento de seguidores:</strong> Aumento percentual de novos seguidores por mês.</li>
        <li><strong>Taxa de conversão:</strong> Quantos seguidores se tornam leads e, posteriormente, alunos.</li>
        <li><strong>Alcance:</strong> Quantas pessoas únicas viram seu conteúdo.</li>
        <li><strong>Custo por lead/aquisição:</strong> Para campanhas pagas, quanto você está gastando para adquirir cada novo aluno.</li>
      </ul>
    `,
    conclusion: `
      <p>As redes sociais oferecem um potencial enorme para academias que desejam aumentar sua visibilidade, engajar com seu público e, principalmente, atrair novos alunos. O segredo está em criar uma estratégia consistente, adaptada para cada plataforma, e que ofereça valor real para seus seguidores.</p>
      <p>Lembre-se que construir uma presença forte nas redes sociais é uma maratona, não uma corrida de 100 metros. Seja paciente, teste diferentes abordagens, analise os resultados e ajuste sua estratégia continuamente.</p>
      <p>E você, já está implementando alguma dessas estratégias na sua academia? Compartilhe nos comentários suas experiências e dúvidas!</p>
    `,
    tableOfContents: [
      { id: "estrategia-instagram", title: "Estratégias para Instagram" },
      { id: "estrategia-facebook", title: "Estratégias para Facebook" },
      { id: "estrategia-tiktok", title: "Estratégias para TikTok" },
      { id: "calendario-conteudo", title: "Criando um Calendário de Conteúdo Eficaz" },
      { id: "estrategia-anuncios", title: "Estratégia de Anúncios Pagos" },
      { id: "metricas-acompanhar", title: "Métricas Importantes para Acompanhar" }
    ],
    relatedPosts: [
      {
        title: "5 Estratégias de Marketing Digital para Academias em 2023",
        slug: "estrategias-marketing-digital-academias-2023",
        excerpt: "Descubra as principais tendências e estratégias que estão ajudando academias a crescer no ambiente digital.",
        image: "https://placehold.co/600x400/blue/white?text=Marketing+Digital"
      },
      {
        title: "Criando Conteúdo Relevante para o Público Fitness",
        slug: "conteudo-relevante-publico-fitness",
        excerpt: "Dicas para criar conteúdo que engaje seu público e posicione sua academia como autoridade no mercado fitness.",
        image: "https://placehold.co/600x400/blue/white?text=Conteúdo"
      },
      {
        title: "Estratégias de Retenção: Como Fidelizar seus Alunos",
        slug: "estrategias-retencao-fidelizar-alunos",
        excerpt: "Aprenda técnicas eficazes para reduzir a taxa de cancelamento e aumentar a satisfação dos seus alunos.",
        image: "https://placehold.co/600x400/blue/white?text=Fidelização"
      }
    ]
  },
  {
    title: "Estratégias de Retenção: Como Fidelizar seus Alunos",
    slug: "estrategias-retencao-fidelizar-alunos",
    metaDescription: "Descubra estratégias comprovadas para aumentar a retenção de alunos na sua academia, reduzir cancelamentos e melhorar a satisfação dos clientes.",
    excerpt: "Aprenda técnicas eficazes para reduzir a taxa de cancelamento e aumentar a satisfação dos seus alunos.",
    publishedDate: "2023-08-05T11:30:00Z",
    image: "https://placehold.co/800x450/blue/white?text=Fidelização",
    imageAlt: "Instrutor de academia ajudando aluno com exercício personalizado",
    categories: [categories.retencaoClientes, categories.marketingDigital],
    author: authors.joaoSilva,
    introduction: `
      <p>Conquistar novos alunos é importante, mas reter os atuais é ainda mais lucrativo e estratégico para academias. Estudos mostram que aumentar a taxa de retenção em apenas 5% pode elevar os lucros entre 25% e 95%.</p>
      <p>Neste artigo, vamos explorar estratégias comprovadas para fidelizar seus alunos, reduzir cancelamentos e criar uma comunidade engajada e satisfeita na sua academia.</p>
    `,
    content: `
      <h2 id="importancia-retencao">A Importância da Retenção de Alunos</h2>
      <p>Antes de mergulharmos nas estratégias, vamos entender por que a retenção é tão crucial:</p>
      
      <ul>
        <li><strong>Custo de aquisição vs. retenção:</strong> Adquirir um novo aluno custa de 5 a 7 vezes mais do que manter um atual.</li>
        <li><strong>Receita recorrente:</strong> Alunos fiéis garantem um fluxo de caixa previsível e estável.</li>
        <li><strong>Marketing orgânico:</strong> Alunos satisfeitos recomendam sua academia para amigos e familiares.</li>
        <li><strong>Feedback valioso:</strong> Alunos de longa data fornecem insights importantes para melhorias.</li>
      </ul>
      
      <h2 id="onboarding-eficaz">1. Crie um Processo de Onboarding Eficaz</h2>
      <p>Os primeiros 30 dias são cruciais para a retenção a longo prazo. Um bom onboarding deve:</p>
      
      <ul>
        <li><strong>Avaliação física e definição de objetivos:</strong> Entenda as necessidades e metas de cada aluno.</li>
        <li><strong>Tour completo pelas instalações:</strong> Familiarize o novo aluno com todos os espaços e recursos disponíveis.</li>
        <li><strong>Apresentação à equipe:</strong> Crie conexões pessoais desde o início.</li>
        <li><strong>Primeiro programa de treino personalizado:</strong> Adapte às necessidades e nível de condicionamento do aluno.</li>
        <li><strong>Acompanhamento nos primeiros treinos:</strong> Ofereça suporte para garantir que o aluno se sinta confortável e confiante.</li>
      </ul>
      
      <h3>Exemplo de sequência de onboarding:</h3>
      <ol>
        <li><strong>Dia 1:</strong> Boas-vindas, avaliação física e primeiro treino com acompanhamento.</li>
        <li><strong>Dia 7:</strong> Check-in para ajustes no treino e esclarecimento de dúvidas.</li>
        <li><strong>Dia 15:</strong> Convite para uma aula experimental de alguma modalidade em grupo.</li>
        <li><strong>Dia 30:</strong> Primeira reavaliação e celebração dos progressos iniciais.</li>
      </ol>
      
      <h2 id="experiencia-personalizada">2. Ofereça uma Experiência Personalizada</h2>
      <p>A personalização é um dos fatores mais importantes para a retenção. Alunos querem sentir que são mais do que apenas um número:</p>
      
      <ul>
        <li><strong>Programas de treino individualizados:</strong> Baseados nos objetivos, preferências e limitações de cada aluno.</li>
        <li><strong>Reconhecimento pessoal:</strong> Chame os alunos pelo nome e lembre-se de detalhes sobre eles.</li>
        <li><strong>Comunicação adaptada:</strong> Alguns alunos preferem mais orientação, outros mais autonomia.</li>
        <li><strong>Comemorações de marcos:</strong> Reconheça aniversários, conquistas de objetivos e "aniversários de academia".</li>
      </ul>
      
      <h2 id="comunidade-engajada">3. Construa uma Comunidade Engajada</h2>
      <p>Alunos que se sentem parte de uma comunidade têm muito menos probabilidade de cancelar:</p>
      
      <ul>
        <li><strong>Eventos sociais:</strong> Organize aulões especiais, desafios em grupo, confraternizações.</li>
        <li><strong>Grupos de WhatsApp ou Telegram:</strong> Crie canais de comunicação onde os alunos possam interagir entre si.</li>
        <li><strong>Programas de "buddy system":</strong> Incentive parcerias de treino entre alunos.</li>
        <li><strong>Reconhecimento público:</strong> Destaque conquistas de alunos nas redes sociais e no espaço físico da academia.</li>
        <li><strong>Causas sociais:</strong> Envolva sua comunidade em ações beneficentes que criam propósito compartilhado.</li>
      </ul>
      
      <h2 id="acompanhamento-resultados">4. Acompanhe e Celebre Resultados</h2>
      <p>Alunos que veem progresso são alunos que permanecem:</p>
      
      <ul>
        <li><strong>Avaliações físicas regulares:</strong> Estabeleça um calendário de reavaliações (a cada 2-3 meses).</li>
        <li><strong>Aplicativo de acompanhamento:</strong> Ofereça ferramentas para que os alunos registrem seus treinos e progressos.</li>
        <li><strong>Fotos de antes e depois:</strong> Com autorização, documente a jornada visual dos alunos.</li>
        <li><strong>Celebrações de marcos:</strong> Crie rituais para comemorar quando alunos atingem objetivos importantes.</li>
      </ul>
      
      <h2 id="programa-fidelidade">5. Implemente um Programa de Fidelidade</h2>
      <p>Recompense a lealdade de forma tangível:</p>
      
      <ul>
        <li><strong>Descontos por tempo de casa:</strong> Ofereça benefícios crescentes conforme o tempo de permanência.</li>
        <li><strong>Sistema de pontos:</strong> Alunos acumulam pontos por frequência, indicações, participação em eventos, etc.</li>
        <li><strong>Acesso a serviços exclusivos:</strong> Reserva prioritária de aulas, acesso a áreas VIP, etc.</li>
        <li><strong>Brindes personalizados:</strong> Camisetas, garrafas d'água, toalhas com a marca da academia.</li>
      </ul>
      
      <h2 id="comunicacao-proativa">6. Mantenha uma Comunicação Proativa</h2>
      <p>Não espere que os alunos venham até você com problemas:</p>
      
      <ul>
        <li><strong>Check-ins regulares:</strong> Estabeleça pontos de contato programados com cada aluno.</li>
        <li><strong>Sistema de alerta para baixa frequência:</strong> Identifique e entre em contato com alunos que começam a faltar.</li>
        <li><strong>Pesquisas de satisfação:</strong> Colete feedback regularmente e aja sobre ele.</li>
        <li><strong>Comunicação transparente:</strong> Mantenha os alunos informados sobre mudanças, novidades e melhorias.</li>
      </ul>
      
      <h2 id="equipe-qualificada">7. Invista em uma Equipe Qualificada e Engajada</h2>
      <p>Sua equipe é o principal ponto de contato com os alunos:</p>
      
      <ul>
        <li><strong>Treinamento contínuo:</strong> Não apenas em aspectos técnicos, mas também em atendimento ao cliente.</li>
        <li><strong>Cultura de serviço:</strong> Estabeleça padrões claros de como os alunos devem ser tratados.</li>
        <li><strong>Reconhecimento e incentivos:</strong> Recompense funcionários que se destacam na retenção de alunos.</li>
        <li><strong>Baixa rotatividade:</strong> Alunos criam vínculos com a equipe; alta rotatividade prejudica esses laços.</li>
      </ul>
      
      <h2 id="ambiente-agradavel">8. Crie um Ambiente Físico Agradável e Atualizado</h2>
      <p>O espaço físico impacta diretamente na experiência do aluno:</p>
      
      <ul>
        <li><strong>Limpeza impecável:</strong> Especialmente em áreas críticas como vestiários e equipamentos.</li>
        <li><strong>Manutenção preventiva:</strong> Equipamentos quebrados geram frustração.</li>
        <li><strong>Atualizações regulares:</strong> Renove o ambiente e os equipamentos periodicamente.</li>
        <li><strong>Música e iluminação:</strong> Crie uma atmosfera energizante e motivadora.</li>
        <li><strong>Áreas de convivência:</strong> Espaços que incentivam a socialização entre os alunos.</li>
      </ul>
    `,
    conclusion: `
      <p>A retenção de alunos não acontece por acaso. É resultado de uma estratégia deliberada e consistente que coloca a experiência do aluno no centro de todas as decisões da academia.</p>
      <p>Implementar as estratégias discutidas neste artigo exige investimento de tempo, energia e, em alguns casos, recursos financeiros. No entanto, o retorno sobre esse investimento é significativo: maior lucratividade, ambiente mais positivo e uma comunidade forte e engajada.</p>
      <p>Lembre-se que a melhor estratégia de retenção começa com a compreensão profunda das necessidades e desejos dos seus alunos. Ouça-os atentamente, adapte-se às suas necessidades e demonstre genuinamente que você se importa com o sucesso deles.</p>
      <p>Qual dessas estratégias você já implementa na sua academia? Quais os maiores desafios que você enfrenta na retenção de alunos? Compartilhe nos comentários!</p>
    `,
    tableOfContents: [
      { id: "importancia-retencao", title: "A Importância da Retenção de Alunos" },
      { id: "onboarding-eficaz", title: "Crie um Processo de Onboarding Eficaz" },
      { id: "experiencia-personalizada", title: "Ofereça uma Experiência Personalizada" },
      { id: "comunidade-engajada", title: "Construa uma Comunidade Engajada" },
      { id: "acompanhamento-resultados", title: "Acompanhe e Celebre Resultados" },
      { id: "programa-fidelidade", title: "Implemente um Programa de Fidelidade" },
      { id: "comunicacao-proativa", title: "Mantenha uma Comunicação Proativa" },
      { id: "equipe-qualificada", title: "Invista em uma Equipe Qualificada e Engajada" },
      { id: "ambiente-agradavel", title: "Crie um Ambiente Físico Agradável e Atualizado" }
    ],
    relatedPosts: [
      {
        title: "5 Estratégias de Marketing Digital para Academias em 2023",
        slug: "estrategias-marketing-digital-academias-2023",
        excerpt: "Descubra as principais tendências e estratégias que estão ajudando academias a crescer no ambiente digital.",
        image: "https://placehold.co/600x400/blue/white?text=Marketing+Digital"
      },
      {
        title: "Como Usar as Redes Sociais para Atrair Novos Alunos",
        slug: "redes-sociais-atrair-alunos",
        excerpt: "Um guia completo sobre como utilizar Instagram, Facebook e TikTok para promover sua academia.",
        image: "https://placehold.co/600x400/blue/white?text=Redes+Sociais"
      },
      {
        title: "Email Marketing para Academias: Guia Completo",
        slug: "email-marketing-academias",
        excerpt: "Como criar campanhas de email eficazes para converter leads, recuperar ex-alunos e fidelizar sua base atual.",
        image: "https://placehold.co/600x400/blue/white?text=Email+Marketing"
      }
    ]
  }
];
const blogPostsForListing = blogPosts.map((post) => ({
  title: post.title,
  slug: post.slug,
  date: post.publishedDate,
  image: post.image,
  excerpt: post.excerpt
}));
const loader = async ({ params }) => {
  const post = blogPosts.find((post2) => post2.slug === params.slug);
  if (!post) {
    throw new Response("Post não encontrado", { status: 404 });
  }
  return json({ post });
};
const meta$4 = ({ data }) => {
  if (!data || !data.post) {
    return [
      { title: "Post não encontrado - Fitness Hub" },
      { name: "description", content: "O post que você está procurando não foi encontrado." }
    ];
  }
  return [
    { title: `${data.post.title} - Fitness Hub` },
    { name: "description", content: data.post.metaDescription },
    { property: "og:title", content: data.post.title },
    { property: "og:description", content: data.post.metaDescription },
    { property: "og:image", content: data.post.image },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: data.post.publishedDate },
    { property: "article:modified_time", content: data.post.updatedDate || data.post.publishedDate },
    { property: "article:author", content: data.post.author.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: data.post.title },
    { name: "twitter:description", content: data.post.metaDescription },
    { name: "twitter:image", content: data.post.image }
  ];
};
function BlogPost() {
  const { post } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 max-w-4xl", children: [
    /* @__PURE__ */ jsx("nav", { className: "text-sm text-gray-500 mb-6", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "list-none p-0 inline-flex", children: [
      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-blue-600", children: "Home" }),
        /* @__PURE__ */ jsx("svg", { className: "fill-current w-3 h-3 mx-2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", children: /* @__PURE__ */ jsx("path", { d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }) })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-blue-600", children: "Blog" }),
        /* @__PURE__ */ jsx("svg", { className: "fill-current w-3 h-3 mx-2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", children: /* @__PURE__ */ jsx("path", { d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }) })
      ] }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: post.title }) })
    ] }) }),
    /* @__PURE__ */ jsxs("article", { children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center text-gray-600 gap-4", children: [
          /* @__PURE__ */ jsxs("time", { dateTime: post.publishedDate, className: "flex items-center", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
            new Date(post.publishedDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: post.author.avatar,
                alt: post.author.name,
                className: "w-6 h-6 rounded-full mr-2"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: post.author.name })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: post.image,
            alt: post.imageAlt,
            className: "w-full h-auto rounded-lg shadow-lg"
          }
        ),
        post.imageCaption && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2 text-center italic", children: post.imageCaption })
      ] }),
      post.tableOfContents && post.tableOfContents.length > 0 && /* @__PURE__ */ jsxs("nav", { className: "bg-gray-50 p-6 rounded-lg mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Índice" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: post.tableOfContents.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: `#${item.id}`,
            className: "text-blue-600 hover:underline flex items-center",
            children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: "•" }),
              item.title
            ]
          }
        ) }, item.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
        /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: post.introduction } }),
        /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: post.content } }),
        /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: post.conclusion } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 p-6 bg-gray-50 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: post.author.avatar,
            alt: post.author.name,
            className: "w-16 h-16 rounded-full"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: post.author.name }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-2", children: post.author.title }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-sm", dangerouslySetInnerHTML: { __html: post.author.bio } }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex gap-4", children: post.author.socialLinks.map((link, index) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-blue-600 hover:text-blue-800",
              children: link.platform
            },
            index
          )) })
        ] })
      ] }) }),
      post.relatedPosts && post.relatedPosts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6", children: "Posts Relacionados" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: post.relatedPosts.map((relatedPost, index) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/blog/${relatedPost.slug}`,
            className: "group block",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: relatedPost.image,
                  alt: relatedPost.title,
                  className: "w-full h-48 object-cover rounded-lg mb-4"
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold group-hover:text-blue-600", children: relatedPost.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mt-2", children: relatedPost.excerpt })
            ]
          },
          index
        )) })
      ] })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogPost,
  loader,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const meta$3 = () => {
  return [
    { title: "Contato - Fitness Hub" },
    { name: "description", content: "Entre em contato com a Fitness Hub para soluções de marketing digital para academias" }
  ];
};
function Contato() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-12 text-center", children: "Entre em Contato" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Envie uma mensagem" }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "nome", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nome" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "nome",
                  name: "nome",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  id: "email",
                  name: "email",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "telefone", className: "block text-sm font-medium text-gray-700 mb-1", children: "Telefone" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                id: "telefone",
                name: "telefone",
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "assunto", className: "block text-sm font-medium text-gray-700 mb-1", children: "Assunto" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "assunto",
                name: "assunto",
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Selecione um assunto" }),
                  /* @__PURE__ */ jsx("option", { value: "consultoria", children: "Consultoria de Marketing" }),
                  /* @__PURE__ */ jsx("option", { value: "gestao-redes", children: "Gestão de Redes Sociais" }),
                  /* @__PURE__ */ jsx("option", { value: "seo", children: "SEO e Marketing de Conteúdo" }),
                  /* @__PURE__ */ jsx("option", { value: "anuncios", children: "Anúncios Pagos" }),
                  /* @__PURE__ */ jsx("option", { value: "outro", children: "Outro" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "mensagem", className: "block text-sm font-medium text-gray-700 mb-1", children: "Mensagem" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "mensagem",
                name: "mensagem",
                rows: 5,
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300",
              children: "Enviar Mensagem"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Informações de Contato" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Endereço" }),
                /* @__PURE__ */ jsxs("p", { className: "mt-1 text-gray-600", children: [
                  "Av. Paulista, 1000",
                  /* @__PURE__ */ jsx("br", {}),
                  "São Paulo, SP",
                  /* @__PURE__ */ jsx("br", {}),
                  "CEP: 01310-100"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Email" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-600", children: /* @__PURE__ */ jsx("a", { href: "mailto:contato@fitnesshub.com.br", className: "hover:text-blue-600", children: "contato@fitnesshub.com.br" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Telefone" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-600", children: /* @__PURE__ */ jsx("a", { href: "tel:+551199999999", className: "hover:text-blue-600", children: "(11) 9999-9999" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Horário de Atendimento" }),
                /* @__PURE__ */ jsxs("p", { className: "mt-1 text-gray-600", children: [
                  "Segunda a Sexta: 9h às 18h",
                  /* @__PURE__ */ jsx("br", {}),
                  "Sábado: 9h às 13h"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Siga-nos nas Redes Sociais" }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
              /* @__PURE__ */ jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-600 hover:text-blue-600", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsx("a", { href: "https://instagram.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-600 hover:text-blue-600", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsx("a", { href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-600 hover:text-blue-600", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }) }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contato,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [
    { title: "Fitness Hub - Marketing Digital para Academias" },
    { name: "description", content: "Soluções de marketing digital para academias e profissionais de fitness" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 mb-10 md:mb-0", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6", children: "Marketing Digital para Academias e Profissionais de Fitness" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-8", children: "Atraia mais alunos, fidelize sua base atual e aumente seus resultados com estratégias de marketing digital específicas para o mercado fitness." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/contato",
              className: "bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-center",
              children: "Fale Conosco"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/blog",
              className: "bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold text-center transition duration-300",
              children: "Ver Conteúdos"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://placehold.co/600x400/blue/white?text=Fitness+Marketing",
          alt: "Marketing Digital para Academias",
          className: "rounded-lg shadow-xl"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Nossos Serviços" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Oferecemos soluções completas de marketing digital para impulsionar o crescimento da sua academia." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: services.map((service, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "text-blue-600 mb-4", children: service.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3", children: service.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: service.description }),
        /* @__PURE__ */ jsx(Link, { to: "/contato", className: "text-blue-600 font-medium hover:underline", children: "Saiba mais →" })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2 mb-10 lg:mb-0 lg:pr-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Por que escolher a Fitness Hub?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8", children: "Somos especialistas no mercado fitness e entendemos os desafios específicos que academias e profissionais enfrentam para atrair e reter alunos." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: benefits.map((benefit, index) => /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-green-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-1", children: benefit.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: benefit.description })
          ] })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:w-1/2", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://placehold.co/600x400/blue/white?text=Por+Que+Nos+Escolher",
          alt: "Por que escolher a Fitness Hub",
          className: "rounded-lg shadow-xl"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "O que nossos clientes dizem" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Veja como ajudamos academias e profissionais de fitness a alcançarem seus objetivos." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center mb-4", children: /* @__PURE__ */ jsx("div", { className: "text-yellow-400 flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i)) }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mb-6 italic", children: [
          '"',
          testimonial.text,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: testimonial.avatar,
              alt: testimonial.name,
              className: "h-12 w-12 rounded-full mr-4"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: testimonial.name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: testimonial.position })
          ] })
        ] })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-blue-600 text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Pronto para transformar o marketing da sua academia?" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-3xl mx-auto", children: "Entre em contato hoje mesmo e descubra como podemos ajudar a sua academia a atrair mais alunos e aumentar seus resultados." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/contato",
          className: "bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold inline-block",
          children: "Fale com um Especialista"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Conteúdos Recentes" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Confira nossas dicas e estratégias mais recentes para o mercado fitness." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: recentPosts.map((post, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: post.image,
            alt: post.title,
            className: "w-full h-48 object-cover"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-2", children: post.date }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3", children: post.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: post.excerpt }),
          /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, className: "text-blue-600 font-medium hover:underline", children: "Ler mais →" })
        ] })
      ] }, index)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/blog",
          className: "bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold inline-block transition duration-300",
          children: "Ver Todos os Artigos"
        }
      ) })
    ] }) })
  ] });
}
const services = [
  {
    title: "Gestão de Redes Sociais",
    description: "Criamos e gerenciamos conteúdo para suas redes sociais, aumentando o engajamento e atraindo novos alunos.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" }) })
  },
  {
    title: "Marketing de Conteúdo",
    description: "Desenvolvemos conteúdos relevantes que posicionam sua academia como autoridade no mercado fitness.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) })
  },
  {
    title: "SEO Local",
    description: "Otimizamos sua presença online para aparecer nos resultados de busca para potenciais clientes da sua região.",
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
    ] })
  },
  {
    title: "Email Marketing",
    description: "Criamos campanhas de email eficazes para converter leads, recuperar ex-alunos e fidelizar sua base atual.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) })
  },
  {
    title: "Anúncios Pagos",
    description: "Gerenciamos campanhas de anúncios no Google e redes sociais para atrair leads qualificados para sua academia.",
    icon: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" }),
      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" })
    ] })
  },
  {
    title: "Consultoria de Marketing",
    description: "Analisamos sua estratégia atual e desenvolvemos um plano personalizado para alcançar seus objetivos.",
    icon: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) })
  }
];
const benefits = [
  {
    title: "Especialistas no Mercado Fitness",
    description: "Entendemos as particularidades do setor e sabemos como atrair e reter alunos."
  },
  {
    title: "Estratégias Personalizadas",
    description: "Desenvolvemos planos de marketing adaptados às necessidades específicas da sua academia."
  },
  {
    title: "Resultados Mensuráveis",
    description: "Trabalhamos com métricas claras para que você possa acompanhar o retorno do seu investimento."
  },
  {
    title: "Equipe Multidisciplinar",
    description: "Contamos com especialistas em diversas áreas do marketing digital para oferecer soluções completas."
  }
];
const testimonials = [
  {
    text: "A Fitness Hub transformou completamente nossa presença digital. Em apenas 3 meses, aumentamos em 40% o número de leads e convertemos 25% deles em novos alunos.",
    name: "Carlos Silva",
    position: "Proprietário da Academia Power Fit",
    avatar: "https://placehold.co/100/blue/white?text=CS"
  },
  {
    text: "O que mais me impressionou foi a capacidade da equipe em entender as particularidades da minha academia e criar estratégias que realmente funcionam para o meu público.",
    name: "Ana Oliveira",
    position: "Diretora da Flex Academia",
    avatar: "https://placehold.co/100/blue/white?text=AO"
  },
  {
    text: "Desde que começamos a trabalhar com a Fitness Hub, nossa taxa de retenção de alunos aumentou significativamente. O conteúdo que eles produzem engaja nossos alunos e fortalece nossa comunidade.",
    name: "Marcos Santos",
    position: "Gestor da Elite Training",
    avatar: "https://placehold.co/100/blue/white?text=MS"
  }
];
const recentPosts = [
  {
    title: "5 Estratégias de Marketing Digital para Academias em 2023",
    slug: "estrategias-marketing-digital-academias-2023",
    date: "15 de Agosto, 2023",
    image: "https://placehold.co/600x400/blue/white?text=Marketing+Digital",
    excerpt: "Descubra as principais tendências e estratégias que estão ajudando academias a crescer no ambiente digital."
  },
  {
    title: "Como Usar as Redes Sociais para Atrair Novos Alunos",
    slug: "redes-sociais-atrair-alunos",
    date: "10 de Agosto, 2023",
    image: "https://placehold.co/600x400/blue/white?text=Redes+Sociais",
    excerpt: "Um guia completo sobre como utilizar Instagram, Facebook e TikTok para promover sua academia."
  },
  {
    title: "Estratégias de Retenção: Como Fidelizar seus Alunos",
    slug: "estrategias-retencao-fidelizar-alunos",
    date: "5 de Agosto, 2023",
    image: "https://placehold.co/600x400/blue/white?text=Fidelização",
    excerpt: "Aprenda técnicas eficazes para reduzir a taxa de cancelamento e aumentar a satisfação dos seus alunos."
  }
];
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [
    { title: "Termos de Uso - Fitness Hub" },
    { name: "description", content: "Termos de uso da Fitness Hub" }
  ];
};
function Termos() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8 text-center", children: "Termos de Uso" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Bem-vindo aos Termos de Uso da Fitness Hub. Este documento é um contrato legal entre você e a Fitness Hub que rege o uso de nossos serviços, site e conteúdos." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "1. Aceitação dos Termos" }),
      /* @__PURE__ */ jsx("p", { children: "Ao acessar ou utilizar nossos serviços, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nossos serviços." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "2. Alterações nos Termos" }),
      /* @__PURE__ */ jsx("p", { children: "Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação dos termos atualizados. Seu uso continuado dos serviços após tais alterações constitui sua aceitação dos novos termos." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "3. Descrição dos Serviços" }),
      /* @__PURE__ */ jsx("p", { children: "A Fitness Hub oferece serviços de marketing digital para academias e profissionais de fitness, incluindo, mas não se limitando a, gestão de redes sociais, marketing de conteúdo, SEO, email marketing, anúncios pagos e consultoria de marketing." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "4. Contas de Usuário" }),
      /* @__PURE__ */ jsx("p", { children: "Alguns de nossos serviços podem exigir que você crie uma conta. Você é responsável por manter a confidencialidade de suas credenciais de conta e por todas as atividades que ocorrem sob sua conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "5. Propriedade Intelectual" }),
      /* @__PURE__ */ jsx("p", { children: "Todo o conteúdo disponibilizado através de nossos serviços, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da Fitness Hub ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais." }),
      /* @__PURE__ */ jsx("p", { children: "Você não pode usar, reproduzir, distribuir, modificar, criar trabalhos derivados, exibir publicamente, executar publicamente, republicar, baixar, armazenar ou transmitir qualquer material de nossos serviços sem nossa permissão prévia por escrito." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "6. Limitação de Responsabilidade" }),
      /* @__PURE__ */ jsx("p", { children: "Em nenhuma circunstância a Fitness Hub, seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes de:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Seu acesso ou uso ou incapacidade de acessar ou usar os serviços;" }),
        /* @__PURE__ */ jsx("li", { children: "Qualquer conduta ou conteúdo de terceiros nos serviços;" }),
        /* @__PURE__ */ jsx("li", { children: "Qualquer conteúdo obtido dos serviços; e" }),
        /* @__PURE__ */ jsx("li", { children: "Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo." })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "7. Indenização" }),
      /* @__PURE__ */ jsx("p", { children: "Você concorda em defender, indenizar e isentar a Fitness Hub, seus diretores, funcionários, parceiros, agentes, fornecedores e afiliados de e contra quaisquer reclamações, responsabilidades, danos, perdas e despesas, incluindo, sem limitação, honorários advocatícios razoáveis, decorrentes de ou de qualquer forma relacionados com:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mb-4", children: [
        /* @__PURE__ */ jsx("li", { children: "Seu acesso ou uso dos serviços;" }),
        /* @__PURE__ */ jsx("li", { children: "Sua violação destes Termos de Uso;" }),
        /* @__PURE__ */ jsx("li", { children: "Sua violação de quaisquer direitos de terceiros; ou" }),
        /* @__PURE__ */ jsx("li", { children: "Sua conduta em conexão com os serviços." })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "8. Lei Aplicável" }),
      /* @__PURE__ */ jsx("p", { children: "Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil, sem consideração aos seus princípios de conflito de leis." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "9. Resolução de Disputas" }),
      /* @__PURE__ */ jsx("p", { children: "Qualquer disputa decorrente ou relacionada a estes Termos de Uso será resolvida por arbitragem, de acordo com as regras da Câmara de Arbitragem do Mercado." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "10. Disposições Gerais" }),
      /* @__PURE__ */ jsx("p", { children: "Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível, tal disposição será eliminada e as disposições restantes serão aplicadas. Nossa falha em fazer valer qualquer direito ou disposição destes Termos não será considerada uma renúncia a tais direitos." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mt-8 mb-4", children: "11. Contato" }),
      /* @__PURE__ */ jsx("p", { children: "Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo e-mail: contato@fitnesshub.com.br" }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-gray-600", children: "Última atualização: 15 de Agosto de 2023" })
    ] }) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Termos,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "Blog - Fitness Hub" },
    { name: "description", content: "Dicas e estratégias de marketing digital para academias e profissionais de fitness" }
  ];
};
function Blog() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-12 text-center", children: "Blog" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: blogPostsForListing.map((post, index) => /* @__PURE__ */ jsx("article", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: post.slug,
        className: "block",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: post.image,
                alt: post.title,
                className: "w-full h-48 object-cover group-hover:opacity-90 transition duration-300"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-2", children: new Date(post.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-3 group-hover:text-blue-600 transition duration-300", children: post.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: post.excerpt }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-600 font-medium group-hover:underline inline-flex items-center", children: [
              "Ler mais",
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 ml-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
            ] })
          ] })
        ]
      }
    ) }, index)) })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Blog,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Bj6SOnDH.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B3_Qz_L1.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DiYHFVBz.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B3_Qz_L1.js"], "css": [] }, "routes/privacidade": { "id": "routes/privacidade", "parentId": "root", "path": "privacidade", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/privacidade-DKe-fbkH.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/blog.$slug": { "id": "routes/blog.$slug", "parentId": "routes/blog", "path": ":slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/blog._slug-pqCmLv05.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B3_Qz_L1.js"], "css": [] }, "routes/contato": { "id": "routes/contato", "parentId": "root", "path": "contato", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contato-DkRzj3YU.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BNOsXyVc.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B3_Qz_L1.js"], "css": [] }, "routes/termos": { "id": "routes/termos", "parentId": "root", "path": "termos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/termos-_SDweWQG.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/blog": { "id": "routes/blog", "parentId": "root", "path": "blog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/blog-DjzXd8ls.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B3_Qz_L1.js"], "css": [] } }, "url": "/assets/manifest-83360b6b.js", "version": "83360b6b" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/privacidade": {
    id: "routes/privacidade",
    parentId: "root",
    path: "privacidade",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/blog.$slug": {
    id: "routes/blog.$slug",
    parentId: "routes/blog",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/contato": {
    id: "routes/contato",
    parentId: "root",
    path: "contato",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "routes/termos": {
    id: "routes/termos",
    parentId: "root",
    path: "termos",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
