import React from 'react';

const Input = ({ type = 'text', name, value, placeholder, onChange, label }) => (
  <div className="mb-3">
    {label && (
      <label
        htmlFor={name}
        className="form-label small text-secondary"
      >
        {label}
      </label>
    )}
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="form-control"
      style={{
        border: '2px solid #6e51b8',
        transition: 'border-color 0.3s',
        backgroundColor: '#fff',
        color: '#000'
      }}
      onFocus={e => e.target.style.borderColor = '#6e51b8'}
      onBlur={e => e.target.style.borderColor = '#6e51b8'}
    />
  </div>
);

export default Input;
