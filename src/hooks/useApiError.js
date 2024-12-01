import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleUnauthorized } from '../utils/auth';

export const useApiError = () => {
  const navigate = useNavigate();

  const handleApiError = useCallback((error) => {
    if (error?.response?.status === 401) {
      handleUnauthorized();
      return 'Session expired. Please login again.';
    }

    // Handle other common error cases
    switch (error?.response?.status) {
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'An internal server error occurred. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }, []);

  return { handleApiError };
}; 