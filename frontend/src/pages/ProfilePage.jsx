import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import get from '../utils/request/index';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth/login'); // Redirect to login if token is missing
        return;
      }

      try {
        setLoading(true);
        const response = await get({ url: 'users/profile', method: 'GET' });
        setProfile(response);
        setLoading(false);
      } catch (error) {
        console.log('Failed to load profile. Please try again later.', error.message);
        setError('Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/auth/login'); // Redirect to login page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-blue-600" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Profile</h2>
          <p className="mt-2 text-gray-600">Welcome back, {profile.name}!</p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1">
              <p className="text-gray-900">{profile.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1">
              <p className="text-gray-900">{profile.name}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="mt-1">
              <p className="text-gray-900">{profile.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            className="text-blue-600 hover:text-blue-500"
            onClick={() => navigate('/settings')}
          >
            Edit Profile
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            className="w-full flex justify-center py-2 px-4 border border-red-600 text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
