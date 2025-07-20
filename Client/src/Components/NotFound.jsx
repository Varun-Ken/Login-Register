const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-center p-4">
      <h1 className="text-8xl font-bold text-gray-100 mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Oops! Page not found.</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Go Home
      </a>
    </div>
  );
};
export default NotFound;
