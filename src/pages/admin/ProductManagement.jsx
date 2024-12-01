import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import ProductForm from "@/components/Admin/ProductForm";

const columns = [
  { key: "title", label: "Name" },
  { key: "price", label: "Price", render: (item) => `$${item.price.toFixed(2)}` },
  { key: "category", label: "Category", render: (item) => item.category.name },
  { 
    key: "createdAt", 
    label: "Created At",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
];

const ProductManagement = () => {
  return (
    <DataManagement
      title="Product"
      endpoint="artworks"
      columns={columns}
      FormComponent={ProductForm}
      searchPlaceholder="Search products..."
    />
  );
};

export default ProductManagement;
