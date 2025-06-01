const Button = ({ children, onClick, type = 'button', active = false, changeOnActive = false }) => {
  const baseStyle = {
    backgroundColor: '#6f42c1',
    borderColor: '#6f42c1',
    width: 'auto'
  };

  const activeStyle = changeOnActive
    ? active
      ? baseStyle
      : { backgroundColor: '#6c757d', borderColor: '#6c757d', width: 'auto' } // cinza para inativo
    : baseStyle;

  return (
    <button
      type={type}
      onClick={onClick}
      className="btn btn-md fw-bold rounded-pill"
      style={activeStyle}
    >
      {children}
    </button>
  );
};

export default Button;
