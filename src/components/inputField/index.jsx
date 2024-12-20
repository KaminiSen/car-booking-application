const InputField = ({ label, value, onChange, placeholder, type = "text" }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    );
  };
  
  export default InputField;
  