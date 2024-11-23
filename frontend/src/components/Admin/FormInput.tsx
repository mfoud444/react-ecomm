import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  id, 
  type = "text", 
  error, 
  required,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <input
          id={id}
          type={type === 'password' && showPassword ? 'text' : type}
          className={`appearance-none relative block w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};


export default FormInput;
