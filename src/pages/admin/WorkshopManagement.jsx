import React from "react";
import DataManagement from "@/components/Admin/DataManagement";
import WorkshopForm from "@/components/Admin/WorkshopForm";

const columns = [
  { key: "name", label: "Name" },
  { key: "location", label: "Location" },
  { 
    key: "startTime", 
    label: "Start Time",
    render: (item) => new Date(item.startTime).toLocaleString()
  },
  { 
    key: "endTime", 
    label: "End Time",
    render: (item) => new Date(item.endTime).toLocaleString()
  },
  { 
    key: "artist", 
    label: "Artist",
    render: (item) => item.user.name
  },
];

const WorkshopManagement = () => {
  return (
    <DataManagement
      title="Workshop"
      endpoint="workshops"
      columns={columns}
      FormComponent={WorkshopForm}
      searchPlaceholder="Search workshops..."
    />
  );
};

export default WorkshopManagement; 