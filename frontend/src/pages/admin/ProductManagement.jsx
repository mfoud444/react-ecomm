import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Button from '@/components/common/Button';

// import { Input as FormInput } from "@/components/Admin/FormInput"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/Table"

const initialProducts = [
  { id: 1, name: 'Product 1', price: 19.99, category: 'Category A' },
  { id: 2, name: 'Product 2', price: 29.99, category: 'Category B' },
  { id: 3, name: 'Product 3', price: 39.99, category: 'Category A' },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
    setShowAddForm(false);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setShowEditForm(false);
    setCurrentProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <Button onClick={() => setShowAddForm(true)} className="mb-4">
        <PlusIcon className="mr-2 h-4 w-4" /> Add Product
      </Button>
      
      {showAddForm && <ProductForm onSubmit={addProduct} onCancel={() => setShowAddForm(false)} />}
      
      {showEditForm && <ProductForm product={currentProduct} onSubmit={updateProduct} onCancel={() => setShowEditForm(false)} />}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button variant="outline" size="icon" onClick={() => {
                  setCurrentProduct(product);
                  setShowEditForm(true);
                }} className="mr-2">
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => deleteProduct(product.id)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

