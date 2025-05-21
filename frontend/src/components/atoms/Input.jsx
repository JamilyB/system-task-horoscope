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
        borderColor: '#ccc',
        transition: 'border-color 0.3s',
      }}
      onFocus={e => e.target.style.borderColor = '#6f42c1'}
      onBlur={e => e.target.style.borderColor = '#ccc'}
    />
  </div>
);

export default Input;
