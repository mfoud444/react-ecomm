import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import OrderForm from "@/components/Admin/OrderForm";

const columns = [
  { key: "id", label: "Order ID" },
  { 
    key: "user", 
    label: "Customer",
    render: (item) => item.user.name
  },
  { 
    key: "totalAmount", 
    label: "Total Amount",
    render: (item) => `$${item.totalAmount.toFixed(2)}`
  },
  { 
    key: "status", 
    label: "Status",
    render: (item) => item.status.toUpperCase()
  },
  { 
    key: "createdAt", 
    label: "Created At",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
];

const OrderManagement = () => {
  return (
    <DataManagement
      title="Order"
      endpoint="orders"
      columns={columns}
      FormComponent={OrderForm}
      searchPlaceholder="Search orders..."
    />
  );
};

export default OrderManagement; 