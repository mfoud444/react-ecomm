import React, { useState, useEffect } from 'react';
import { v6 as uuidv6 } from 'uuid';
import post from '../utils/request/index';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';

// Reusable Dropdown Component
const RoleSelect = ({ value, onChange, error }) => (
  <div>
    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
      Role <span className="text-red-500">*</span>
    </label>
    <div className="mt-1">
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        className={`appearance-none relative block w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      >
        <option value="">Select Role</option>
        <option value="Customer">Customer</option>
        <option value="Artist">Artist</option>
        <option value="Admin">Admin</option>
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  </div>
);

const SignupPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    salt: '',
    name: '',
    email: '',
    phoneNumber: '+9665',
    password: '',
    confirmPassword: '',
    description: '',
    role: 'Customer',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, id: uuidv6() }));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber || !/^\+9665[0-9]{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number should be a valid Saudi number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
       
        const { confirmPassword, ...dataToSubmit } = formData;
        console.log("dataToSubmit", dataToSubmit)
        const response = await post({
          url: 'users',
          data: dataToSubmit,
        });
        if (response.success) {
          setSuccessMessage('Account created successfully!');
          setTimeout(() => navigate('/profile'), 2000);
        } else {
          setSuccessMessage('Error creating account. Try again.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        setSuccessMessage('Error submitting form. Try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber' && !value.startsWith('+966')) return;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!formData.name) newErrors.name = 'Name is required';
        break;
      case 'email':
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        break;
      case 'phoneNumber':
        if (!formData.phoneNumber || !/^\+9665[0-9]{8}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Phone number should be a valid Saudi number';
        }
        break;
      case 'password':
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phoneNumber &&
      formData.password &&
      formData.confirmPassword &&
      formData.role &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            required
            placeholder="Enter your name"
          />
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            required
            placeholder="Enter your email"
          />
          <div className="relative">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center">
              <img
                src="https://flagcdn.com/w40/sa.png"
                alt="Saudi Arabia Flag"
                className="w-6 h-6 mr-2"
              />
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Saudi phone number"
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            required
            placeholder="Enter your password"
          />
          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            required
            placeholder="Confirm your password"
          />
          <RoleSelect
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
          />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter a brief description (optional)"
            />
          </div>
          <button
            type="submit"
         
           
          >
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
          {successMessage && (
            <p
              className={`mt-4 text-center ${
                successMessage.includes('Error')
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

