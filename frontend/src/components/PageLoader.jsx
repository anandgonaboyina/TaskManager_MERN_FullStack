const PageLoader = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-300 bg-opacity-75 z-50">
      <div className="text-center">
        {/* The spinner element: animate-spin utility provides the continuous rotation animation. */}
        <div 
          className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
          role="status"
        >
          {/* sr-only class hides the text visually but makes it accessible to screen readers */}
          <span className="sr-only">Loading...</span>
        </div>
        
        {/* Loading text with a margin above the spinner */}
        <p className="mt-4 text-white text-lg">
         {message || "Loading... Please wait."}
        </p>
      </div>
    </div>
  );
};


const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '6px solid #e0e0e0',
  borderTop: '6px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  transformX:"50%"
};

const textStyle = {
  marginTop: '15px',
  fontFamily: 'sans-serif',
  fontSize: '1.1rem',
  color: '#555',
  fontWeight: '500',
  
};

export default PageLoader;
