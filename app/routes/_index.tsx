import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness Hub - Marketing Digital para Academias" },
    { name: "description", content: "Soluções de marketing digital para academias e profissionais de fitness" },
  ];
};

export default function Index() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Marketing Digital para Academias e Profissionais de Fitness
              </h1>
              <p className="text-xl mb-8">
                Atraia mais alunos, fidelize sua base atual e aumente seus resultados com estratégias de marketing digital específicas para o mercado fitness.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/contato" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-center"
                >
                  Fale Conosco
                </Link>
                <Link 
                  to="/blog" 
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold text-center transition duration-300"
                >
                  Ver Conteúdos
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://placehold.co/600x400/blue/white?text=Fitness+Marketing" 
                alt="Marketing Digital para Academias" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas de marketing digital para impulsionar o crescimento da sua academia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to="/contato" className="text-blue-600 font-medium hover:underline">
                  Saiba mais →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que escolher a Fitness Hub?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Somos especialistas no mercado fitness e entendemos os desafios específicos que academias e profissionais enfrentam para atrair e reter alunos.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://placehold.co/600x400/blue/white?text=Por+Que+Nos+Escolher" 
                alt="Por que escolher a Fitness Hub" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como ajudamos academias e profissionais de fitness a alcançarem seus objetivos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar o marketing da sua academia?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Entre em contato hoje mesmo e descubra como podemos ajudar a sua academia a atrair mais alunos e aumentar seus resultados.
          </p>
          <Link 
            to="/contato" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold inline-block"
          >
            Fale com um Especialista
          </Link>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conteúdos Recentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Confira nossas dicas e estratégias mais recentes para o mercado fitness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                    Ler mais →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/blog" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold inline-block transition duration-300"
            >
              Ver Todos os Artigos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Services data
const services = [
  {
    title: "Gestão de Redes Sociais",
    description: "Criamos e gerenciamos conteúdo para suas redes sociais, aumentando o engajamento e atraindo novos alunos.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    )
  },
  {
    title: "Marketing de Conteúdo",
    description: "Desenvolvemos conteúdos relevantes que posicionam sua academia como autoridade no mercado fitness.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    )
  },
  {
    title: "SEO Local",
    description: "Otimizamos sua presença online para aparecer nos resultados de busca para potenciais clientes da sua região.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Email Marketing",
    description: "Criamos campanhas de email eficazes para converter leads, recuperar ex-alunos e fidelizar sua base atual.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Anúncios Pagos",
    description: "Gerenciamos campanhas de anúncios no Google e redes sociais para atrair leads qualificados para sua academia.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    )
  },
  {
    title: "Consultoria de Marketing",
    description: "Analisamos sua estratégia atual e desenvolvemos um plano personalizado para alcançar seus objetivos.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

// Benefits data
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

// Testimonials data
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

// Recent blog posts data
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
