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
import Popconfirm from "@/components/common/Popconfirm";
import Alert from "@/components/common/Alert";
import { useApiError } from '@/hooks/useApiError';

const DataManagement = ({
  title,
  endpoint,
  columns,
  FormComponent,
  searchPlaceholder = "Search...",
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const { handleApiError } = useApiError();

  const fetchData = async () => {
    try {
      setIsTableLoading(true);
      var url = '';
      if(endpoint ==='artworks'){
       url = `${endpoint}?page=${page}&pageSize=${pageSize}&sortBy=createdAt`;
      }else{
         url = `${endpoint}`;
      }
      const response = await get({
        url: url,
      });
      console.log(response)
      if(endpoint ==='artworks'){
        setData(response.items || []);
        setTotalItems(response.totalCount || 0);
     
      }else{
        setData(response || []);
        setTotalItems(response.length || 0);
      }
   
   
      setError(null);
    } catch (err) {
      if (response?.status == 404) {
        setError(null);
      } else {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      }
   
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const showAlertMessage = (title, type) => {
    setAlert({ title, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAdd = async (item) => {
    try {
      await post({ url: endpoint, data: item });
      await fetchData();
      setShowAddForm(false);
      showAlertMessage(`${title} added successfully`, "success");
    } catch (err) {
      const errorMessage = handleApiError(err);
      showAlertMessage(errorMessage, "error");
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      await put({ url: `${endpoint}/${updatedItem.id}`, data: updatedItem });
      await fetchData();
      setShowEditForm(false);
      setCurrentItem(null);
      showAlertMessage(`${title} updated successfully`, "success");
    } catch (err) {
      const errorMessage = handleApiError(err);
      showAlertMessage(errorMessage, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await del({ url: `${endpoint}/${id}` });
      await fetchData();
      setShowDeleteConfirm(false);
      setItemToDelete(null);
      showAlertMessage(`${title} deleted successfully`, "success");
      if (response?.status === 204 || response === undefined) {
        console.log("Action successfully completed with no content.");
      } else {
        console.log("Action completed successfully:", response);
      }
    } catch (err) {
      const errorMessage = handleApiError(err);
      showAlertMessage(errorMessage, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) => del({ url: `${endpoint}/${id}` }))
      );
      setSelectedRows([]);
      await fetchData();
      showAlertMessage(`Selected ${title.toLowerCase()}s deleted successfully`, "success");
    } catch (err) {
      const errorMessage = handleApiError(err);
      showAlertMessage(errorMessage, "error");
    }
  };

  const handleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (loading && !data.length) {
    return (
      <div className="flex h-[80vh] justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] justify-center items-center">
        <StateError message={error} onTryAgain={fetchData} />
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

      <h1 className="text-2xl font-bold mb-4 underlined">{title} Management</h1>

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
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
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
            text={`Add ${title}`}
            bgColor="bg-blue-600"
            textColor="text-white"
            handler={() => setShowAddForm(true)}
            icon={<PlusIcon className="mr-2 h-4 w-4" />}
          />
          <Button
            text="Delete Selected"
            bgColor="bg-red-500"
            textColor="text-white"
            handler={handleDeleteSelected}
            icon={<TrashIcon className="mr-2 h-4 w-4" />}
            disabled={selectedRows.length === 0}
          />
        </div>
      </div>

      {showAddForm && (
        <FormComponent
          onSubmit={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && (
        <FormComponent
          item={currentItem}
          onSubmit={handleUpdate}
          onCancel={() => {
            setShowEditForm(false);
            setCurrentItem(null);
          }}
        />
      )}

      <Popconfirm
        isOpen={showDeleteConfirm}
        onConfirm={() => handleDelete(itemToDelete)}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
        title={`Delete ${title}`}
        description={`Are you sure you want to delete this ${title.toLowerCase()}?`}
      >
        {isDeleting && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <Loading />
          </div>
        )}
      </Popconfirm>

      {!showAddForm && !showEditForm && (
        <div className="relative">
          {isTableLoading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 z-10 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <Table>
            <TableHeader className="bg-yellow-400 text-center">
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedRows(
                        e.target.checked ? data.map((item) => item.id) : []
                      )
                    }
                    checked={selectedRows.length === data.length}
                  />
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} className="text-center py-8">
                    <div className="flex min-h-[50vh] flex-col items-center gap-2">
                      <Iconify
                        icon="mdi:folder-open"
                        className="w-12 h-12 text-gray-400"
                      />
                      <p className="text-gray-500">No {title.toLowerCase()}s found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleRowSelection(item.id)}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render ? column.render(item) : item[column.key]}
                      </TableCell>
                    ))}
                    <TableCell className="flex gap-2">
                      <Button
                        text=""
                        bgColor="bg-blue-500"
                        textColor="text-white"
                        handler={() => {
                          setCurrentItem(item);
                          setShowEditForm(true);
                        }}
                        icon={<PencilIcon className="h-4 w-4" />}
                      />
                      <Button
                        text=""
                        bgColor="bg-red-500"
                        textColor="text-white"
                        handler={() => {
                          setItemToDelete(item.id);
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
        </div>
      )}

      {!showAddForm && !showEditForm && (
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded p-2 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              text="Previous"
              disabled={page === 1 || isTableLoading}
              handler={() => setPage((prev) => Math.max(prev - 1, 1))}
              bgColor={page === 1 ? "bg-gray-300" : "bg-blue-500"}
              textColor="text-white"
            />
            <span className="flex items-center">
              Page {page} of {totalPages}
            </span>
            <Button
              text="Next"
              disabled={page === totalPages || isTableLoading}
              handler={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              bgColor={page === totalPages ? "bg-gray-300" : "bg-blue-500"}
              textColor="text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement; 