import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import CategoryForm from "@/components/Admin/CategoryForm";

const columns = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
];

const CategoryManagement = () => {
  return (
    <DataManagement
      title="Category"
      endpoint="categories"
      columns={columns}
      FormComponent={CategoryForm}
      searchPlaceholder="Search categories..."
    />
  );
};

export default CategoryManagement; 