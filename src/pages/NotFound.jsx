import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="404"
        className="w-96 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className=" btn text-white bg-black">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
