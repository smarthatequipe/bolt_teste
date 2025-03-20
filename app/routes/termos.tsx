import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Termos de Uso - Fitness Hub" },
    { name: "description", content: "Termos de uso da Fitness Hub" },
  ];
};

export default function Termos() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Termos de Uso</h1>
      
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="prose prose-lg max-w-none">
          <p>
            Bem-vindo aos Termos de Uso da Fitness Hub. Este documento é um contrato legal entre você e a Fitness Hub que rege o uso de nossos serviços, site e conteúdos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou utilizar nossos serviços, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar nossos serviços.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação dos termos atualizados. Seu uso continuado dos serviços após tais alterações constitui sua aceitação dos novos termos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Descrição dos Serviços</h2>
          <p>
            A Fitness Hub oferece serviços de marketing digital para academias e profissionais de fitness, incluindo, mas não se limitando a, gestão de redes sociais, marketing de conteúdo, SEO, email marketing, anúncios pagos e consultoria de marketing.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contas de Usuário</h2>
          <p>
            Alguns de nossos serviços podem exigir que você crie uma conta. Você é responsável por manter a confidencialidade de suas credenciais de conta e por todas as atividades que ocorrem sob sua conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo disponibilizado através de nossos serviços, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da Fitness Hub ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
          </p>
          <p>
            Você não pode usar, reproduzir, distribuir, modificar, criar trabalhos derivados, exibir publicamente, executar publicamente, republicar, baixar, armazenar ou transmitir qualquer material de nossos serviços sem nossa permissão prévia por escrito.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitação de Responsabilidade</h2>
          <p>
            Em nenhuma circunstância a Fitness Hub, seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes de:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Seu acesso ou uso ou incapacidade de acessar ou usar os serviços;</li>
            <li>Qualquer conduta ou conteúdo de terceiros nos serviços;</li>
            <li>Qualquer conteúdo obtido dos serviços; e</li>
            <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Indenização</h2>
          <p>
            Você concorda em defender, indenizar e isentar a Fitness Hub, seus diretores, funcionários, parceiros, agentes, fornecedores e afiliados de e contra quaisquer reclamações, responsabilidades, danos, perdas e despesas, incluindo, sem limitação, honorários advocatícios razoáveis, decorrentes de ou de qualquer forma relacionados com:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Seu acesso ou uso dos serviços;</li>
            <li>Sua violação destes Termos de Uso;</li>
            <li>Sua violação de quaisquer direitos de terceiros; ou</li>
            <li>Sua conduta em conexão com os serviços.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Lei Aplicável</h2>
          <p>
            Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil, sem consideração aos seus princípios de conflito de leis.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Resolução de Disputas</h2>
          <p>
            Qualquer disputa decorrente ou relacionada a estes Termos de Uso será resolvida por arbitragem, de acordo com as regras da Câmara de Arbitragem do Mercado.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Disposições Gerais</h2>
          <p>
            Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível, tal disposição será eliminada e as disposições restantes serão aplicadas. Nossa falha em fazer valer qualquer direito ou disposição destes Termos não será considerada uma renúncia a tais direitos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo e-mail: contato@fitnesshub.com.br
          </p>
          
          <p className="mt-8 text-gray-600">
            Última atualização: 15 de Agosto de 2023
          </p>
        </div>
      </div>
    </div>
  );
}
