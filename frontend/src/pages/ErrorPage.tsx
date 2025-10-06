import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
      <p className="text-xl text-gray-600">Something went wrong.</p>
      <Link to="/" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
