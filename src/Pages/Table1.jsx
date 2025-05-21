import React, { useState, useEffect } from "react";
import { IconDotsVertical, IconTrashX } from "@tabler/icons-react";
import { api } from '../Host'; // Import the API
import { format } from 'date-fns';
import * as XLSX from "xlsx"; // Import the xlsx library

function Table1() {
  const [menuVisible, setMenuVisible] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [dentists, setDentists] = useState([]); // Store fetched dentist data
  const [selectedDentist, setSelectedDentist] = useState(null); // For modal display
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of dentists per page

  // Fetch dentists when component loads
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await api.get('/dentist/get'); // Fetch all dentists from your backend
        setDentists(response.data.data.reverse());
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
      }
    };
    fetchDentists();
  }, []);

  const downloadExcel = () => {
    const data = dentists.map(dentist => ({
      "Dentist ID": dentist.dentist_id,
      "Dentist Register No":dentist.dentist_reg_number,
      "Dentist Name": dentist.dentist_name,
      "Date & Time": format(new Date(dentist.createdAt), 'dd MMMM yyyy - hh:mm a'),
      "Phone Number": dentist.phone,
      "Email ID": dentist.email
    }));

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(data);
    // Create a workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dentists");

    // Generate the Excel file and prompt download
    XLSX.writeFile(wb, "Dentists_Data.xlsx");
  };


  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const handleEdit = (dentist) => {
    setSelectedDentist(dentist);
    setEditModalVisible(true);
    setMenuVisible(null);
  };

  const handleView = (dentist) => {
    setSelectedDentist(dentist);
    setViewModalVisible(true);
    setMenuVisible(null);
  };

  const handleDelete = (dentistId) => {
    setSelectedDentist(dentistId);
    setDeleteModalVisible(true);
    setMenuVisible(null);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/dentist/delete`, { params: { dentist_id: selectedDentist } }); // Delete dentist by ID
      setDentists(dentists.filter(dentist => dentist.dentist_id !== selectedDentist));
      setDeleteModalVisible(false);
      displayNotification("Customer deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete dentist:", error);
      displayNotification("Error deleting customer", "error");
    }
  };
 
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM yyyy - hh:mm a');
  };

  const updateDentist = async () => {
    try {
      const updatedDentistData = {
        dentist_id: selectedDentist.dentist_id,
        dentist_name: selectedDentist.dentist_name,
        phone: selectedDentist.phone,
        email: selectedDentist.email,
      };
  
      const response = await api.put(`/dentist/update?dentist_id=${selectedDentist.dentist_id}`, updatedDentistData);
  
      if (response.status === 200) {
        setDentists(dentists.map(dentist =>
          dentist.dentist_id === selectedDentist.dentist_id ? selectedDentist : dentist
        ));
        setEditModalVisible(false);
        displayNotification("Dentist updated successfully", "success");
      } else {
        console.error("Failed to update dentist:", response.data);
      }
    } catch (error) {
      console.error("Failed to update dentist:", error);
      displayNotification("Error updating Dentist", "error");
    }
  };

  const displayNotification = (message, type) => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide after 3 seconds
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter dentists based on search query
  const filteredDentists = dentists.filter(dentist =>
    dentist.dentist_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dentist.dentist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dentist.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dentist.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const currentDentists = filteredDentists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDentists.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
       {editModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex">
              <h2 className="text-xl font-bold mb-4">Edit Dentist</h2>
            </div>

            <div className="p-6">
              <label htmlFor="dentistName" className="font-semibold">Dentist Name</label>
              <input
                type="text"
                id="dentistName"
                value={selectedDentist?.dentist_name || ''}
                onChange={(e) => setSelectedDentist({ ...selectedDentist, dentist_name: e.target.value })}
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="Name"
              />

              <label htmlFor="phoneNumber" className="font-semibold">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                value={selectedDentist?.phone || ''}
                onChange={(e) => setSelectedDentist({ ...selectedDentist, phone: e.target.value })}
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="Telephone Call"
              />

              <label htmlFor="emailId" className="font-semibold">Email ID</label>
              <input
                type="email"
                id="emailId"
                value={selectedDentist?.email || ''}
                onChange={(e) => setSelectedDentist({ ...selectedDentist, email: e.target.value })}
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="abc@gmail.com"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="border border-black text-black px-7 py-2 ml-2 rounded-full"
                  onClick={() => setEditModalVisible(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#001F2A] text-white px-7 py-2 rounded-full"
                  onClick={updateDentist} // Updated to call updateDentist
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


{viewModalVisible && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
      <div className="flex mb-4">
        <h2 className="text-xl font-bold">View Dentist</h2>
      </div>

      <div className="p-6">
        <label htmlFor="dentistName" className="font-semibold">
          Dentist Name
        </label>
        <p id="dentistName" className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">
          {selectedDentist?.dentist_name || 'N/A'}
        </p>

        <label htmlFor="phoneNumber" className="font-semibold">
          Phone Number
        </label>
        <p id="phoneNumber" className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">
          {selectedDentist?.phone || 'N/A'}
        </p>

        <label htmlFor="emailId" className="font-semibold">
          Email ID
        </label>
        <p id="emailId" className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">
          {selectedDentist?.email || 'N/A'}
        </p>

        <label htmlFor="dateTime" className="font-semibold">
                Date & Time
              </label>
              <p id="dateTime" className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">
                {selectedDentist?.createdAt ? formatDate(selectedDentist.createdAt) : 'N/A'}
              </p>

        <div className="flex justify-center mt-5">
          <button
            className="border border-black text-white bg-black px-9 py-2 rounded-full"
            onClick={() => setViewModalVisible(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      {deleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[350px] flex flex-col">
            <div className="flex justify-center">
              <IconTrashX className="text-red-500" />
            </div>
            <p className="text-center font-bold mb-3 mt-2">Delete</p>
            <p className="text-center font-bold mb-3">Dentist ID: {selectedDentist}</p>

            <p className="text-center">
              Are you sure? If you delete this dentist ID, you can't retrieve the data.
            </p>
            <div className="flex justify-center gap-2 mt-2">
              <button
                className="border border-red-600 text-red-600 px-7 py-2 rounded-full"
                onClick={() => setDeleteModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#001F2A] text-white px-7 py-2 rounded-full"
                onClick={confirmDelete}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="lg:m-3 mt-14 m-3">
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dentists</h1>
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 rounded-md"
            style={{ marginRight: '0' }}
          />
        </div>

        {/* Scrollable Table */}
        <div className="p-1 max-h-[500px] lg:max-h-[500px] h-[calc(100vh-200px)] overflow-y-auto">
          <table className="min-w-full divide-y divide-black border-black border table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-400 px-1 py-1 text-center text-sm text-black bg-[#E7E7E7]">S.no</th>
                <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Dentist ID</th>
                <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Reg No</th>
                <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Dentist Name</th>
                <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Date & Time</th>
                <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Phone Number</th>
                <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Email ID</th>
                <th className="border border-gray-500 px-6 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
                  <IconDotsVertical stroke={1} />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-black">
              {currentDentists.map((dentist, index) => (
                <tr key={dentist.dentist_id}>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">{dentist.dentist_id}</td>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">{dentist.dentist_reg_number}</td>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">{dentist.dentist_name}</td>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">{formatDate(dentist.createdAt)}</td>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">{dentist.phone}</td>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">{dentist.email}</td>
                  <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0] relative">
                    <div onClick={() => toggleMenu(index)} className="cursor-pointer">
                      <IconDotsVertical stroke={1} />
                    </div>
                    {menuVisible === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <ul>
                          <li
                            onClick={() => handleView(dentist)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            View
                          </li>
                          <li
                            onClick={() => handleEdit(dentist)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Edit
                          </li>
                          <li
                            onClick={() => handleDelete(dentist.dentist_id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Buttons */}
        <div className="mt-4 flex justify-between space-x-2">
          <div>
          <button
            onClick={downloadExcel}
            className="bg-[#001F2A] text-white px-7 py-2 rounded-full"
          >
            Download Data
          </button>
          </div>
          <div>
          <button
            className={`px-3 py-2 rounded bg-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-2">Page {currentPage} of {totalPages}</span>
          <button
            className={`px-3 py-2 rounded bg-gray-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Table1;
