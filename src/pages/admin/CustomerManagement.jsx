import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import CustomerForm from "@/components/Admin/CustomerForm";

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
  { key: "role", label: "Role" },
];

const CustomerManagement = () => {
  return (
    <DataManagement
      title="Customer"
      endpoint="users?role=Customer"
      columns={columns}
      FormComponent={CustomerForm}
      searchPlaceholder="Search customers..."
    />
  );
};

export default CustomerManagement;