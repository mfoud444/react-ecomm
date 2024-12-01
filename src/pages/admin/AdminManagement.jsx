import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import AdminForm from "@/components/Admin/AdminForm";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
  { 
    key: "createdAt", 
    label: "Created At",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
];

const AdminManagement = () => {
  return (
    <DataManagement
      title="Admin"
      endpoint="users?role=Admin"
      columns={columns}
      FormComponent={AdminForm}
      searchPlaceholder="Search admins..."
    />
  );
};

export default AdminManagement; 