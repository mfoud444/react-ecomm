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