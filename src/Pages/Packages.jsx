import React, { useState, useEffect } from 'react';
import { api } from '../Host';

function Packages() {
  const [packages, setPackages] = useState([]); // State to store package list
  const [modalVisible, setModalVisible] = useState(false); // State to show/hide modal
  const [newPackage, setNewPackage] = useState({
    package_name: '',
    mrp: '',
    offer: '',
    features: '',
    duration: '',
  });

  // Fetch packages on component mount
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  // Add a new package
  const addPackage = async () => {
    try {
      const response = await api.post('/package/post', newPackage);
      if (response.status === 201) {
        setPackages([...packages, response.data.data]);
        alert('Package added successfully!');
      }
      closeModal();
    } catch (error) {
      console.error('Error adding package:', error);
      alert(error.response?.data?.message || 'Failed to add package');
    }
  };

  // Close modal and reset states
  const closeModal = () => {
    setModalVisible(false);
    setNewPackage({ package_name: '', mrp: '', offer: '', features: '', duration: '' });
  };

  return (
    <div className="overflow-y-auto h-screen p-4">
      <div className="flex justify-between">
        <h1 className="p-2 font-bold font-[Century Gothic] text-xl">Packages</h1>
        <button
          className="border border-[#001F2A] text-[#001F2A] px-2 py-0.5 rounded-full"
          onClick={() => setModalVisible(true)}
        >
          Add Package
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">Add Package</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="package_name"
                placeholder="Package Name"
                className="w-full border px-3 py-2 rounded-md"
                value={newPackage.package_name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="mrp"
                placeholder="MRP"
                className="w-full border px-3 py-2 rounded-md"
                value={newPackage.mrp}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="offer"
                placeholder="Offer"
                className="w-full border px-3 py-2 rounded-md"
                value={newPackage.offer}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="features"
                placeholder="Features (comma-separated)"
                className="w-full border px-3 py-2 rounded-md"
                value={newPackage.features}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (in months)"
                className="w-full border px-3 py-2 rounded-md"
                value={newPackage.duration}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="border border-black px-5 py-2 rounded-full mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#001F2A] text-white px-5 py-2 rounded-full"
                onClick={addPackage}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Packages Display */}
      <div className="h-screen overflow-y-auto border rounded-lg p-4 lg:mb-10 bg-[#EEF1F6]">
  <div className="flex flex-wrap gap-3">
    {packages.length > 0 ? (
      packages.map((pkg) => (
        <div
          key={pkg.id}
          className="border p-4 rounded-lg shadow-md flex flex-col  items-center space-y-2 w-[200px]"
        >
          <h3 className="font-bold text-lg">{pkg.package_name}</h3>
          <img src="./package.png" alt="" className='h-20 w-20' />
          <p>MRP: ₹{pkg.mrp}</p>
          <p>Offer: ₹{pkg.offer}</p>
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
