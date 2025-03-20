import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { blogPosts } from "../data/blogPosts";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    throw new Response("Post não encontrado", { status: 404 });
  }
  
  return json({ post });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data.post) {
    return [
      { title: "Post não encontrado - Fitness Hub" },
      { name: "description", content: "O post que você está procurando não foi encontrado." },
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
    { name: "twitter:image", content: data.post.image },
  ];
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
            </svg>
          </li>
          <li className="flex items-center">
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
            </svg>
          </li>
          <li>
            <span className="text-gray-700">{post.title}</span>
          </li>
        </ol>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center text-gray-600 gap-4">
            <time dateTime={post.publishedDate} className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </time>
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>{post.author.name}</span>
            </div>
          </div>
        </header>

        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.imageAlt} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {post.imageCaption && (
            <p className="text-sm text-gray-500 mt-2 text-center italic">
              {post.imageCaption}
            </p>
          )}
        </div>

        {post.tableOfContents && post.tableOfContents.length > 0 && (
          <nav className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Índice</h2>
            <ul className="space-y-2">
              {post.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <span className="mr-2">•</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.introduction }} />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <div dangerouslySetInnerHTML={{ __html: post.conclusion }} />
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-4">
            <img 
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">{post.author.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{post.author.title}</p>
              <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: post.author.bio }} />
              <div className="mt-4 flex gap-4">
                {post.author.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Posts Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost, index) => (
                <Link
                  key={index}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <img 
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold group-hover:text-blue-600">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
