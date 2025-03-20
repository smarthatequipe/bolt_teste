import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { blogPostsForListing } from "../data/blogPosts";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog - Fitness Hub" },
    { name: "description", content: "Dicas e estratégias de marketing digital para academias e profissionais de fitness" },
  ];
};

// Componente de Card de Blog separado para melhor organização
function BlogCard({ post, index }: { post: any; index: number }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300">
      <Link 
        to={`/blog/${post.slug}`}
        prefetch="intent"
        className="block no-underline"
      >
        <div className="relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(post.date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition duration-300">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-blue-600 font-medium">
            Ler mais
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Blog() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dicas e estratégias de marketing digital para academias e profissionais de fitness
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsForListing.map((post, index) => (
            <BlogCard key={index} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
