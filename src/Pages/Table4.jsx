import React, { useState,useEffect } from 'react';
import { IconDotsVertical, IconTrashX } from '@tabler/icons-react'; // Added IconTrashX
import { api } from '../Host'; // Import the API
import { format } from 'date-fns';
function Table4() {
  const [menuVisible, setMenuVisible] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [admins, setadmins] = useState([]); // Store fetched dentist data
  const [selectedadmin, setSelectedadmin] = useState(null); 
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get('/admin/get'); // Fetch all dentists from your backend
        setadmins(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
      }
    };
    fetchAdmins();
  }, []);

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const handleEdit = (admin) => {
    setSelectedadmin(admin);
    setEditModalVisible(true);
    setMenuVisible(null);
  };

  const handleView = (admin) => {
    setSelectedadmin(admin);
    setViewModalVisible(true);
    setMenuVisible(null);
  };

  const handleDelete = (adminId) => {
    setSelectedadmin(adminId);
    setDeleteModalVisible(true);
    setMenuVisible(null);
  };
  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/delete`, { params: { admin_id: selectedadmin } }); // Delete admin by ID
      // Update the state immediately after successful deletion
      setadmins(admins.filter(admin => admin.admin_id !== selectedadmin));
      setDeleteModalVisible(false);
      displayNotification("Admin deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete Admin:", error);
      displayNotification("Error deleting Admin", "error");
    }
  };
  
 

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMMM yyyy - hh:mm a');
  };

  const updateAdmin = async () => {
    try {
      const updatedAdminData = {
        admin_id: selectedadmin.admin_id,
        admin_name: selectedadmin.admin_name,
        email: selectedadmin.email,
        // Add other fields as necessary
      };
  
      const response = await api.put(`/admin/update?admin_id=${selectedadmin.admin_id}`, updatedAdminData);
  
      if (response.status === 200) {
        setadmins(admins.map(admin =>
          admin.admin_id === selectedadmin.admin_id ? selectedadmin : admin
        ));
        setEditModalVisible(false);
        displayNotification("Admin updated successfully", "success");
      } else {
        console.error("Failed to update Admin", response.data);
      }
    } catch (error) {
      console.error("Failed to update Admin", error);
      displayNotification("Error updating Admin", "error");
    }
  };

  const displayNotification = (message, type) => {
    setNotification({ message, type });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide after 3 seconds
  };
// State to manage modal visibility and new admin data
const [addModalVisible, setAddModalVisible] = useState(false);
const [newAdmin, setNewAdmin] = useState({ admin_name: '', email: '', password: '' });


// Function to add new admin
const addAdmin = async () => {
  try {
    console.log("Adding Admin with Data:", newAdmin);

    const response = await api.post('/admin/post', newAdmin);

    // Check if the response is successful
    if (response.status === 201 && response.data.newAdmin) {
      console.log("Admin Added Successfully:", response.data);

      // Add the new admin to the current list of admins
      setAdmins([...admins, response.data.newAdmin]);

      // Close the modal and reset the form
      handleCloseAddModal();
      
      // Optionally, display success notification
      displayNotification("Admin added successfully", "success");
    } else {
      console.log("Failed to Add Admin:", response.data);
      // Handle the failure case
      displayNotification("Failed to add Admin", "error");
    }
  } catch (error) {
    console.error("Error adding Admin:", error);
    displayNotification("Error adding Admin", "error");
  }
};




// Function to show the Add Admin modal
const handleOpenAddModal = () => {
  setAddModalVisible(true);
};

// Function to close the Add Admin modal
const handleCloseAddModal = () => {
  setAddModalVisible(false);
  setNewAdmin({ admin_name: '', email: '', password: '' }); // Reset the form
};

  return (
    <div className='lg:m-3 mt-14 m-3 overflow-auto'>
    {addModalVisible && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
      <div className="flex">
        <h2 className="text-xl font-bold mb-4">Add Admin</h2>
      </div>

      <div className="p-6">
        <label htmlFor="name" className="font-semibold">Admin Name</label>
        <input
          type="text"
          className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
          placeholder="Name"
          value={newAdmin.admin_name || ''}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, admin_name: e.target.value })
          }
        />

        <label htmlFor="email" className="font-semibold">Email ID:</label>
        <input
          type="email"
          className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
          placeholder="abc@gmail.com"
          value={newAdmin.email || ''}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, email: e.target.value })
          }
        />

        <label htmlFor="password" className="font-semibold">Password:</label>
        <input
          type="password"
          className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
          placeholder="Password"
          value={newAdmin.password || ''}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, password: e.target.value })
          }
        />

        <div className="flex justify-end gap-2 mt-2">
          <button
            className="border border-black text-black px-7 py-2 ml-2 rounded-full"
            onClick={() => setAddModalVisible(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#001F2A] text-white px-7 py-2 rounded-full"
            onClick={() => {
              addAdmin();
              handleCloseAddModal(); // Close the modal here
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {editModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex">
              <h2 className="text-xl font-bold mb-4 ">Edit Admin</h2>
            </div>

            <div className="p-6">
              <label htmlFor="name" className="font-semibold">Admin Name</label>
              <input
                type="text"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="Name"
                value={selectedadmin?.admin_name || ''}
                onChange={(e) =>
                  setSelectedadmin({ ...selectedadmin, admin_name: e.target.value })
                }
              />

              <label htmlFor="email" className="font-semibold">Email ID:</label>
              <input
                type="email"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="abc@gmail.com"
                value={selectedadmin?.email || ''}
                onChange={(e) =>
                  setSelectedadmin({ ...selectedadmin, email: e.target.value })
                }
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
                  onClick={updateAdmin}
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
            <div className="flex">
              <h2 className="text-xl font-bold mb-4 ">View Admin</h2>
            </div>

            <div className="p-6">
              <label htmlFor="" className="font-semibold">Admin Name</label>
              <p className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">
                {selectedadmin?.admin_name || 'N/A'}
              </p>
              <label htmlFor="" className="font-semibold">Email ID</label>
              <p className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">
                {selectedadmin?.email || 'N/A'}
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
            <p className="text-center font-bold mb-3 mt-2">Delete Admin</p>
            <p className="text-center font-bold mb-3">{selectedadmin?.admin_name}</p>
            <p className="text-center">
              Are you sure you want to delete this admin? This action cannot be undone.
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

      <div className='flex justify-between mb-2'> 
        <p className='p-2 font-bold font-[Century Gothic] text-xl'>Admin</p>
        <button
          className="border border-[#001F2A] text-[#001F2A] px-2 py-0.5 rounded-full"
          onClick={() => handleOpenAddModal(true)} // This opens the "Add Admin" modal
        >
          Add Admin
        </button>
      </div>

      <div className='p-1 max-h-[350px]'>
        <table className='min-w-full divide-y divide-black border-black border'>
          <thead className='bg-gray-50'>
            <tr>
              <th className="border border-gray-400 px-1 py-1 text-center text-sm text-black bg-[#E7E7E7]">S.no</th>
              <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Admin ID</th>
              <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Admin Name</th>
              <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Date & Time</th>

              <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Email ID</th>
              <th className="border border-gray-500 px-6 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]"><IconDotsVertical stroke={1} /></th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-black'>
            {admins.map((admin, index) => (
              <tr key={admin.admin_id}>
                <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{index + 1}</td>
                <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{admin.admin_id}</td>
                <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{admin.admin_name}</td>
                <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{formatDate(admin.createdAt)}</td>
               
                <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{admin.email}</td>
                <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0] relative">
                  <div onClick={() => toggleMenu(index)} className="cursor-pointer">
                    <IconDotsVertical stroke={1} />
                  </div>
                  {menuVisible === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <ul>
                        <li
                          onClick={() => handleView(admin)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          View
                        </li>
                        <li
                          onClick={() => handleEdit(admin)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Edit
                        </li>
                        <li
                          onClick={() => handleDelete(admin.admin_id)}
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
    </div>
  );

}

export default Table4;
