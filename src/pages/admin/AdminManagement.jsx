import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import AdminForm from "@/components/Admin/AdminForm";

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
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