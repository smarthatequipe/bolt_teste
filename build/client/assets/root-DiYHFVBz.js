import{r as o,j as e}from"./jsx-runtime-56DGgGmo.js";import{l as u,n as v,o as g,p,_ as w,L as s,M as f,q as N,O as y,S as b,t as k}from"./components-B3_Qz_L1.js";/**
 * @remix-run/react v2.16.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let n="positions";function S({getKey:a,...c}){let{isSpaMode:x}=u(),l=v(),d=g();p({getKey:a,storageKey:n});let h=o.useMemo(()=>{if(!a)return null;let t=a(l,d);return t!==l.key?t:null},[]);if(x)return null;let m=((t,j)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let i=JSON.parse(sessionStorage.getItem(t)||"{}")[j||window.history.state.key];typeof i=="number"&&window.scrollTo(0,i)}catch(r){console.error(r),sessionStorage.removeItem(t)}}).toString();return o.createElement("script",w({},c,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${JSON.stringify(n)}, ${JSON.stringify(h)})`}}))}function L(){return e.jsx("header",{className:"bg-white shadow-md py-4",children:e.jsxs("div",{className:"container mx-auto px-4 flex flex-col md:flex-row justify-between items-center",children:[e.jsx("div",{className:"flex items-center mb-4 md:mb-0",children:e.jsxs(s,{to:"/",className:"flex items-center",children:[e.jsx("img",{src:"/logo-light.png",alt:"Fitness Hub",className:"h-10 mr-3"}),e.jsx("span",{className:"text-xl font-bold text-blue-600",children:"Fitness Hub"})]})}),e.jsx("nav",{children:e.jsxs("ul",{className:"flex flex-wrap justify-center space-x-6",children:[e.jsx("li",{children:e.jsx(s,{to:"/",className:"text-gray-700 hover:text-blue-600 font-medium",children:"Home"})}),e.jsx("li",{children:e.jsx(s,{to:"/blog",className:"text-gray-700 hover:text-blue-600 font-medium",children:"Blog"})}),e.jsx("li",{children:e.jsx(s,{to:"/contato",className:"text-gray-700 hover:text-blue-600 font-medium",children:"Contato"})}),e.jsx("li",{children:e.jsx(s,{to:"/termos",className:"text-gray-700 hover:text-blue-600 font-medium",children:"Termos"})}),e.jsx("li",{children:e.jsx(s,{to:"/privacidade",className:"text-gray-700 hover:text-blue-600 font-medium",children:"Privacidade"})})]})})]})})}function M(){return e.jsx("footer",{className:"bg-gray-800 text-white pt-12 pb-8",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Fitness Hub"}),e.jsx("p",{className:"text-gray-300 mb-4",children:"Soluções de marketing digital para academias e profissionais de fitness."}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("a",{href:"https://facebook.com",target:"_blank",rel:"noopener noreferrer",className:"text-gray-300 hover:text-white",children:e.jsx("svg",{className:"h-6 w-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{fillRule:"evenodd",d:"M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",clipRule:"evenodd"})})}),e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noopener noreferrer",className:"text-gray-300 hover:text-white",children:e.jsx("svg",{className:"h-6 w-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{fillRule:"evenodd",d:"M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",clipRule:"evenodd"})})}),e.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer",className:"text-gray-300 hover:text-white",children:e.jsx("svg",{className:"h-6 w-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"})})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Links Rápidos"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsx("li",{children:e.jsx(s,{to:"/",className:"text-gray-300 hover:text-white",children:"Home"})}),e.jsx("li",{children:e.jsx(s,{to:"/blog",className:"text-gray-300 hover:text-white",children:"Blog"})}),e.jsx("li",{children:e.jsx(s,{to:"/contato",className:"text-gray-300 hover:text-white",children:"Contato"})}),e.jsx("li",{children:e.jsx(s,{to:"/termos",className:"text-gray-300 hover:text-white",children:"Termos de Adesão"})}),e.jsx("li",{children:e.jsx(s,{to:"/privacidade",className:"text-gray-300 hover:text-white",children:"Política de Privacidade"})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Contato"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{className:"flex items-start",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2 mt-0.5 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),e.jsxs("span",{className:"text-gray-300",children:["Av. Paulista, 1000",e.jsx("br",{}),"São Paulo, SP",e.jsx("br",{}),"CEP: 01310-100"]})]}),e.jsxs("li",{className:"flex items-center",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})}),e.jsx("a",{href:"mailto:contato@fitnesshub.com.br",className:"text-gray-300 hover:text-white",children:"contato@fitnesshub.com.br"})]}),e.jsxs("li",{className:"flex items-center",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})}),e.jsx("a",{href:"tel:+551199999999",className:"text-gray-300 hover:text-white",children:"(11) 9999-9999"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Horário de Atendimento"}),e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{className:"flex items-center",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),e.jsx("span",{className:"text-gray-300",children:"Segunda a Sexta: 9h às 18h"})]}),e.jsxs("li",{className:"flex items-center",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),e.jsx("span",{className:"text-gray-300",children:"Sábado: 9h às 13h"})]})]})]})]}),e.jsx("div",{className:"border-t border-gray-700 mt-10 pt-8",children:e.jsxs("p",{className:"text-center text-gray-400",children:["© ",new Date().getFullYear()," Fitness Hub. Todos os direitos reservados."]})})]})})}const z="/assets/tailwind-DjZO96XN.css",H=()=>[{rel:"stylesheet",href:z}];function R(){return e.jsxs("html",{lang:"pt-BR",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(f,{}),e.jsx(N,{})]}),e.jsxs("body",{className:"flex flex-col min-h-screen",children:[e.jsx(L,{}),e.jsx("main",{className:"flex-grow",children:e.jsx(y,{})}),e.jsx(M,{}),e.jsx(S,{}),e.jsx(b,{}),e.jsx(k,{})]})]})}export{R as default,H as links};
