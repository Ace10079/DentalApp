import React, { useState, useEffect } from 'react';
import { api } from '../Host';
import { FaEllipsisV } from 'react-icons/fa';
import { IconTrashX } from '@tabler/icons-react'; 

function Packages() {
  const [packages, setPackages] = useState([]); 
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);
  const [newPackage, setNewPackage] = useState({
    package_name: '',
    mrp: '',
    offer: '',
    features: '',
    duration: '',
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/package/getAll');
        if (response.status === 200) {
          setPackages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  const updatePackage = async () => {
    try {
      const response = await api.put(`/package/update?package_no=${selectedPackage.package_no}`, newPackage);
      if (response.status === 200) {
        setPackages(packages.map(pkg => (pkg.package_no === selectedPackage.package_no ? response.data.data : pkg)));
        alert('Package updated successfully!');
      }
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating package:', error);
      alert(error.response?.data?.message || 'Failed to update package');
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/package/delete?package_no=${selectedPackage.package_no}`);
      if (response.status === 200) {
        setPackages(packages.filter(pkg => pkg.package_no !== selectedPackage.package_no));
        alert('Package deleted successfully!');
      }
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting package:', error);
      alert(error.response?.data?.message || 'Failed to delete package');
    }
  };

  const openEditModal = (pkg) => {
    setSelectedPackage(pkg);
    setNewPackage({
      package_name: pkg.package_name,
      mrp: pkg.mrp,
      offer: pkg.offer,
      features: pkg.features,
      duration: pkg.duration,
    });
    setEditModalVisible(true);
  };

  const openDeleteModal = (pkg) => {
    setSelectedPackage(pkg);
    setDeleteModalVisible(true);
  };

  return (
    <div className="overflow-y-auto h-screen p-4">
      <div className="flex justify-between">
        <h1 className="p-2 font-bold font-[Century Gothic] text-xl">Packages</h1>
      </div>

      {/* Edit Package Modal */}
      {editModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex">
              <h2 className="text-xl font-bold mb-4">Edit Package</h2>
            </div>

            <div className="p-6">
              <label htmlFor="packageName" className="font-semibold">Package Name</label>
              <input
                type="text"
                id="packageName"
                value={newPackage.package_name}
                onChange={handleInputChange}
                name="package_name"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
              />

              <label htmlFor="mrp" className="font-semibold">MRP</label>
              <input
                type="number"
                id="mrp"
                value={newPackage.mrp}
                onChange={handleInputChange}
                name="mrp"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
              />

              <label htmlFor="offer" className="font-semibold">Offer Price</label>
              <input
                type="number"
                id="offer"
                value={newPackage.offer}
                onChange={handleInputChange}
                name="offer"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
              />

              <label htmlFor="features" className="font-semibold">Features</label>
              <input
                type="text"
                id="features"
                value={newPackage.features}
                onChange={handleInputChange}
                name="features"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
              />

              <label htmlFor="duration" className="font-semibold">Duration (Months)</label>
              <input
                type="number"
                id="duration"
                value={newPackage.duration}
                onChange={handleInputChange}
                name="duration"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button className="border border-black px-7 py-2 rounded-full" onClick={() => setEditModalVisible(false)}>Cancel</button>
                <button className="bg-[#001F2A] text-white px-7 py-2 rounded-full" onClick={updatePackage}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[350px] flex flex-col">
            <div className="flex justify-center">
              <IconTrashX className="text-red-500" size={48} />
            </div>
            <p className="text-center font-bold mb-3 mt-2">Delete</p>
            <p className="text-center font-bold mb-3">Package ID: {selectedPackage?.package_no}</p>

            <p className="text-center">
              Are you sure? If you delete this package, you can't retrieve the data.
            </p>
            <div className="flex justify-center gap-2 mt-2">
              <button className="border border-red-600 text-red-600 px-7 py-2 rounded-full" onClick={() => setDeleteModalVisible(false)}>Cancel</button>
              <button className="bg-[#001F2A] text-white px-7 py-2 rounded-full" onClick={confirmDelete}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* Packages Display */}
      <div className="h-screen overflow-y-auto border rounded-lg p-4 lg:mb-10 bg-[#EEF1F6]">
        <div className="flex flex-wrap gap-3">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg.package_no} className="relative border p-4 rounded-lg shadow-md flex flex-col items-center space-y-2 w-[200px]">
                <div className="absolute top-2 right-2">
                  <button onClick={() => setMenuVisible(menuVisible === pkg.package_no ? null : pkg.package_no)}>
                    <FaEllipsisV />
                  </button>
                  {menuVisible === pkg.package_no && (
                    <div className="absolute top-6 right-0 bg-white shadow-md border rounded-md w-24">
                      <button className="block w-full px-2 py-1 text-left hover:bg-gray-200" onClick={() => openEditModal(pkg)}>Edit</button>
                      <button className="block w-full px-2 py-1 text-left hover:bg-gray-200" onClick={() => confirmDelete(pkg)}>Delete</button>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-lg">{pkg.package_name}</h3>
                <img src="./package.png" alt="" className="h-20 w-20" />
                <p>₹{pkg.mrp}</p>
                <p className="line-through">₹{pkg.offer}</p>
                <p>Features: {pkg.features}</p>
                <p>Duration: {pkg.duration} months</p>
              </div>
            ))
          ) : (
            <p>No packages available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Packages;