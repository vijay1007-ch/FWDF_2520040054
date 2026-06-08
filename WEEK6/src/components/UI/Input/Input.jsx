import './Input.css';

const Input = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  icon: Icon,
  placeholder,
  ...props 
}) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <div className={`input-wrapper ${error ? 'has-error' : ''}`}>
        {Icon && <Icon className="input-icon" size={20} />}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${Icon ? 'with-icon' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="input-error animate-slide-in">{error}</span>}
    </div>
  );
};

export default Input;
