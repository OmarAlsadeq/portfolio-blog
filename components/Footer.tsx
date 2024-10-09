import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="https://twitter.com/yourhandle" className="hover:text-blue-400">
            Twitter
          </Link>
          <Link href="https://linkedin.com/in/yourprofile" className="hover:text-blue-400">
            LinkedIn
          </Link>
          <Link href="https://github.com/yourusername" className="hover:text-blue-400">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
