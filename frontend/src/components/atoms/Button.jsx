const Button = ({ children, onClick, type = 'button', active = false, changeOnActive = false }) => {
  const baseStyle = {
    backgroundColor: '#6e51b8',
    borderColor: '#6e51b8',
    width: 'auto',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 600
  };

  const activeStyle = changeOnActive
    ? active
      ? baseStyle
      : { backgroundColor: '#301b68', borderColor: '#301b68',color: '#fff' , width: 'auto' }
    : baseStyle;


  return (
    <button
      type={type}
      onClick={onClick}
      className="btn btn-md rounded"
      style={activeStyle}
    >
      {children}
    </button>
  );
};

export default Button;
