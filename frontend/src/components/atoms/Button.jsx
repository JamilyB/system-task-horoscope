const Button = ({ children, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className="btn btn-md btn-primary fw-bold rounded-pill"
    style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' , width: 'auto'}}
  >
    {children}
  </button>
);


export default Button;