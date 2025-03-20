import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Política de Privacidade - Fitness Hub" },
    { name: "description", content: "Política de privacidade da Fitness Hub" },
  ];
};

export default function Privacidade() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidade</h1>
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="prose prose-lg max-w-none">
          <p>
            A Fitness Hub valoriza a privacidade de seus usuários e está comprometida em proteger suas informações pessoais. Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos suas informações quando você utiliza nossos serviços.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Informações que Coletamos</h2>
          <p>
            Podemos coletar os seguintes tipos de informações:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Informações de Identificação Pessoal:</strong> Nome, endereço de e-mail, número de telefone, endereço postal e outras informações que você nos fornece voluntariamente.
            </li>
            <li>
              <strong>Informações de Uso:</strong> Dados sobre como você interage com nossos serviços, incluindo páginas visitadas, tempo gasto no site, links clicados e preferências de navegação.
            </li>
            <li>
              <strong>Informações do Dispositivo:</strong> Tipo de dispositivo, sistema operacional, tipo de navegador, configurações de idioma e outras informações técnicas.
            </li>
            <li>
              <strong>Informações de Localização:</strong> Dados sobre sua localização geográfica, que podem ser precisos (como GPS) ou menos precisos (como cidade ou país).
            </li>
            <li>
              <strong>Cookies e Tecnologias Semelhantes:</strong> Utilizamos cookies e tecnologias semelhantes para coletar informações sobre sua atividade, navegador e dispositivo.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Como Usamos Suas Informações</h2>
          <p>
            Utilizamos as informações coletadas para:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fornecer, manter e melhorar nossos serviços;</li>
            <li>Processar transações e enviar notificações relacionadas;</li>
            <li>Enviar comunicações de marketing, atualizações e informações promocionais;</li>
            <li>Personalizar sua experiência e fornecer conteúdo e ofertas relevantes;</li>
            <li>Analisar tendências de uso e otimizar nossos serviços;</li>
            <li>Detectar, prevenir e resolver problemas técnicos e de segurança;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Compartilhamento de Informações</h2>
          <p>
            Podemos compartilhar suas informações nas seguintes circunstâncias:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Com Prestadores de Serviços:</strong> Compartilhamos informações com empresas que nos auxiliam na operação de nossos serviços, como processamento de pagamentos, análise de dados, entrega de e-mails, hospedagem e serviços de atendimento ao cliente.
            </li>
            <li>
              <strong>Para Conformidade Legal:</strong> Podemos divulgar informações quando acreditamos de boa-fé que a divulgação é necessária para cumprir a lei, proteger nossos direitos ou responder a um processo legal.
            </li>
            <li>
              <strong>Em Caso de Transferência de Negócios:</strong> Se a Fitness Hub estiver envolvida em uma fusão, aquisição ou venda de ativos, suas informações podem ser transferidas como parte dessa transação.
            </li>
            <li>
              <strong>Com Seu Consentimento:</strong> Podemos compartilhar suas informações com terceiros quando você nos autorizar a fazê-lo.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Segurança das Informações</h2>
          <p>
            Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações contra acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro, e não podemos garantir sua segurança absoluta.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Seus Direitos e Escolhas</h2>
          <p>
            Você tem certos direitos em relação às suas informações pessoais:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Acessar, corrigir ou excluir suas informações pessoais;</li>
            <li>Opor-se ao processamento de suas informações;</li>
            <li>Restringir o processamento de suas informações;</li>
            <li>Solicitar a portabilidade de suas informações;</li>
            <li>Optar por não receber comunicações de marketing.</li>
          </ul>
          <p>
            Para exercer esses direitos, entre em contato conosco através dos dados fornecidos na seção "Contato" abaixo.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Retenção de Dados</h2>
          <p>
            Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Crianças</h2>
          <p>
            Nossos serviços não são direcionados a pessoas menores de 18 anos, e não coletamos intencionalmente informações pessoais de crianças. Se você é pai ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos tomar as medidas apropriadas.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas de informação. Recomendamos que você revise esta política regularmente para estar ciente de quaisquer alterações. A data da última atualização será indicada no final desta política.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contato</h2>
          <p>
            Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre nossas práticas de privacidade, entre em contato conosco pelo e-mail: privacidade@fitnesshub.com.br
          </p>
          
          <p className="mt-8 text-gray-600">
            Última atualização: 15 de Agosto de 2023
          </p>
        </div>
      </div>
    </div>
  );
}
