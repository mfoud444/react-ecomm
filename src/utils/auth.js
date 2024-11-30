export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getUserRole = () => {
  const role = localStorage.getItem('role');
  return role;
};

export const isAdmin = () => {
  return getUserRole() === 'Admin';
}; 

export const getCurrentProfile = () => {
  const profile = localStorage.getItem('profile');
  return profile;
};