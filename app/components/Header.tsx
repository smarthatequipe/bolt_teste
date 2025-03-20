import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo-light.png" 
              alt="Fitness Hub" 
              className="h-10 mr-3"
            />
            <span className="text-xl font-bold text-blue-600">Fitness Hub</span>
          </Link>
        </div>
        
        <nav>
          <ul className="flex flex-wrap justify-center space-x-6">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/contato" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contato
              </Link>
            </li>
            <li>
              <Link 
                to="/termos" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Termos
              </Link>
            </li>
            <li>
              <Link 
                to="/privacidade" 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
