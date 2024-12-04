export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const updateQuantity = (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
}; 