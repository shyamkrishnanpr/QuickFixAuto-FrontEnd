import React from "react";

const ErrorPage = () => {
  return (
    <>
      <div className="bg-gray-100 h-screen flex flex-col">
        <section className="flex-grow flex items-center justify-center">
          <div className="container mx-auto">
            <div className="text-center">
              <div className="bg-red-500 rounded-full w-60 h-60 flex items-center justify-center mx-auto">
                <h2 className="text-8xl text-white">404</h2>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold">
                  Something went wrong here
                </h3>
                <p className="text-gray-600">
                  The page you are looking for is not available!
                </p>
                <a
                  href="/"
                  className="mt-4 inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ErrorPage;
