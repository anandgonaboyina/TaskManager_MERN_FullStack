const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div style={spinnerStyle}></div>
      
      <p style={textStyle}>{message}</p>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#ffffff'
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '6px solid #e0e0e0',
  borderTop: '6px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

const textStyle = {
  marginTop: '15px',
  fontFamily: 'sans-serif',
  fontSize: '1.1rem',
  color: '#555',
  fontWeight: '500'
};

export default PageLoader;
