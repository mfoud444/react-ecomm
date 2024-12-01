import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import ArtistForm from "@/components/Admin/ArtistForm";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
  { key: "description", label: "Description" },
  { 
    key: "createdAt", 
    label: "Created At",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
];

const ArtistManagement = () => {
  return (
    <DataManagement
      title="Artist"
      endpoint="users?role=Artist"
      columns={columns}
      FormComponent={ArtistForm}
      searchPlaceholder="Search artists..."
    />
  );
};

export default ArtistManagement; 