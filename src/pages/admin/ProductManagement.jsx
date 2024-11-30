import React, { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, Search } from "lucide-react";
import Button from "@/components/common/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/Table";
import { get, post, put, del } from "@/utils/request";
import StateError from "@/components/common/StateError";
import Loading from "@/components/common/Loading";
import Iconify from "@/components/common/Iconify";
import ProductForm from "@/components/Admin/ProductForm";
import Popconfirm from "@/components/common/Popconfirm";
import Alert from "@/components/common/Alert";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await get({
        url: `artworks?page=${page}&pageSize=${pageSize}`,
      });
      setProducts(response.items || []);
      setTotalItems(response.total || 0);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  const showAlertMessage = (title, type) => {
    setAlert({ title, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const addProduct = async (product) => {
    try {
      setLoading(true);
      await post({ url: "artworks", data: product });
      await fetchProducts();
      setShowAddForm(false);
      showAlertMessage("Product added successfully", "success");
    } catch (err) {
      showAlertMessage("Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      setLoading(true);
      await put({ url: `artworks/${updatedProduct.id}`, data: updatedProduct });
      await fetchProducts();
      setShowEditForm(false);
      setCurrentProduct(null);
      showAlertMessage("Product updated successfully", "success");
    } catch (err) {
      showAlertMessage("Failed to update product", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedProducts = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) => del({ url: `artworks/${id}` }))
      );
      setSelectedRows([]);
      await fetchProducts();
      showAlertMessage("Selected products deleted successfully", "success");
    } catch (err) {
      showAlertMessage("Failed to delete selected products", "error");
    }
  };

  const handleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDeleteProduct = async (id) => {
    try {
      setIsDeleting(true);
      await del({ url: `artworks/${id}` });
      await fetchProducts();
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      showAlertMessage("Product deleted successfully", "success");
    } catch (err) {
      showAlertMessage("Failed to delete product", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (loading && !products.length) {
    return (
      <div className="flex h-[80vh] justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] justify-center items-center">
        <StateError message={error} onTryAgain={fetchProducts} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {alert && (
        <Alert
          title={alert.title}
          type={alert.type}
          duration={3000}
          onClose={() => setAlert(null)}
        />
      )}

      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
          }}
          className="flex-grow flex gap-2"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          <Button
            text="Search"
            bgColor="bg-blue-500"
            textColor="text-white"
            type="submit"
          />
        </form>
<div className="flex flex-row gap-4">
        <Button
          text="Add Product"
         className=" bg-blue-600"
          textColor="text-white"
          handler={() => setShowAddForm(true)}
          icon={<PlusIcon className="mr-2 h-4 w-4" />}
        />
        <Button
          text="Delete Selected"
          bgColor="bg-red-500"
          textColor="text-white"
          handler={() => {deleteSelectedProducts();  setShowDeleteConfirm(true);}}
          icon={<TrashIcon className="mr-2 h-4 w-4" />}
          disabled={selectedRows.length === 0}
        />
        </div>
      </div>

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

      <Popconfirm
        isOpen={showDeleteConfirm}
        onConfirm={() => handleDeleteProduct(productToDelete)}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        }}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
      >
        {isDeleting && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </Popconfirm>

      {!showAddForm && !showEditForm && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked ? products.map((p) => p.id) : []
                    )
                  }
                  checked={selectedRows.length === products.length}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Iconify
                      icon="mdi:file-search"
                      className="w-12 h-12 text-gray-400"
                    />
                    <p className="text-gray-500">No products found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(product.id)}
                      onChange={() => handleRowSelection(product.id)}
                    />
                  </TableCell>
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
              ))
            )}
          </TableBody>
        </Table>

        
      )}
   {!showAddForm && !showEditForm && (
<div className="mt-4 flex justify-between items-center">
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          className="border rounded p-2"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>)}

    </div>
  );
}
