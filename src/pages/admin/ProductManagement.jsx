import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import Button from '@/components/common/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/Table";
import { get, post, put, del } from '@/utils/request';
import StateError from '@/components/common/StateError';
import Loading from '@/components/common/Loading';
import Iconify from '../../components/common/Iconify';
import ProductForm from '@/components/Admin/ProductForm';
import Popconfirm from '@/components/common/Popconfirm';
export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await get({ url: 'artworks', method: 'GET' });
      console.log(response)
      setProducts(response.items || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const addProduct = async (product) => {
    try {
      setLoading(true);
      await post({ 
        url: 'artworks', 
        data: product 
      });
      await fetchProducts();
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  // Update existing product
  const updateProduct = async (updatedProduct) => {
    try {
      setLoading(true);
      await put({ 
        url: `artworks/${updatedProduct.id}`, 
        data: updatedProduct 
      });
      await fetchProducts();
      setShowEditForm(false);
      setCurrentProduct(null);
    } catch (err) {
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await del({ url: `artworks/${id}` });
      await fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return  <div className="flex h-[80vh] justify-center items-center"> <Loading /></div>;
  }

  if (error) {
    return <div className="flex h-[80vh] justify-center items-center"> <StateError message={error.message} onTryAgain={fetchProducts} /></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      
      <Button 
        text="Add Product"
        bgColor="bg-primary"
        textColor="text-white"
        handler={() => setShowAddForm(true)}
        className="mb-4"
        icon={<PlusIcon className="mr-2 h-4 w-4" />}
      />

      {showAddForm && (
        <ProductForm 
          onSubmit={addProduct} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}
      
      {showEditForm && (
        <ProductForm 
          product={currentProduct} 
          onSubmit={updateProduct} 
          onCancel={() => {
            setShowEditForm(false);
            setCurrentProduct(null);
          }} 
        />
      )}
     {!showAddForm && !showEditForm && (
 
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
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  text=""
                  bgColor="bg-blue-500"
                  textColor="text-white"
                  handler={() => {
                    setCurrentProduct(product);
                    setShowEditForm(true);
                  }}
                  icon={<PencilIcon className="h-4 w-4" />}
                />
                <Button
                  text=""
                  bgColor="bg-red-500"
                  textColor="text-white"
                  className="rounded-full"
                  handler={() => {
                    setProductToDelete(product.id);
                    setShowDeleteConfirm(true);
                  }}
                  icon={<Iconify icon="mdi:trash" />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     )}
      <Popconfirm
        isOpen={showDeleteConfirm}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={() => {
          deleteProduct(productToDelete);
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        }}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        }}
      />
    </div>
  );
}

