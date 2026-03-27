import { Rocket } from 'lucide-react';

const PageLoader = ({ message }) => {
  return (
    <>
        <div className="flex flex-col h-screen items-center justify-center space-y-3">
        <Rocket className="w-30 h-30 text-blue-500 animate-bounce" />
          <p className="text-white text-sm font-medium animate-pulse">
           {message || "Loading... Please wait."}
            </p>
  </div>

    </>
  );
};


export default PageLoader;
