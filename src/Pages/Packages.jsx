import React, { useState, useEffect } from 'react';
import { api } from '../Host';
import { FaEllipsisV } from 'react-icons/fa';
import { IconTrashX } from '@tabler/icons-react';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);
  const [modal, setModal] = useState({ type: '', visible: false });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageData, setPackageData] = useState({
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
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  const addPackage = async () => {
    try {
      const response = await api.post('/package/post', packageData);
      if (response.status === 201) {
        setPackages([...packages, response.data.data]);
        alert('Package added successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error adding package:', error);
      alert(error.response?.data?.message || 'Failed to add package');
    }
  };

  const updatePackage = async () => {
    try {
      const response = await api.put(`/package/update?package_no=${selectedPackage.package_no}`, packageData);
      if (response.status === 200) {
        setPackages(packages.map(pkg => (pkg.package_no === selectedPackage.package_no ? response.data.data : pkg)));
        alert('Package updated successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error updating package:', error);
      alert(error.response?.data?.message || 'Failed to update package');
    }
  };

  const deletePackage = async () => {
    try {
      await api.delete(`/package/delete?package_no=${selectedPackage.package_no}`);
      setPackages(packages.filter(pkg => pkg.package_no !== selectedPackage.package_no));
      alert('Package deleted successfully!');
      closeModal();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert(error.response?.data?.message || 'Failed to delete package');
    }
  };

  const openModal = (type, pkg = null) => {
    setSelectedPackage(pkg);
    setModal({ type, visible: true });

    if (type === 'edit' && pkg) {
      setPackageData({
        package_name: pkg.package_name,
        mrp: pkg.mrp,
        offer: pkg.offer,
        features: pkg.features,
        duration: pkg.duration,
      });
    } else {
      setPackageData({ package_name: '', mrp: '', offer: '', features: '', duration: '' });
    }
  };

  const closeModal = () => setModal({ type: '', visible: false });

  return (
    <div className="overflow-y-auto h-screen p-4">
      <div className="flex justify-between">
        <h1 className="p-2 font-bold font-[Century Gothic] text-xl">Packages</h1>
        <button className="bg-[#001F2A] text-white px-4 py-2 rounded-lg" onClick={() => openModal('add')}>Add Package</button>
      </div>

      {modal.visible && (
        <Modal title={modal.type === 'edit' ? 'Edit Package' : 'Add Package'} onClose={closeModal} onSave={modal.type === 'edit' ? updatePackage : addPackage}>
          <PackageForm data={packageData} onChange={handleInputChange} />
        </Modal>
      )}

      {modal.type === 'delete' && modal.visible && (
        <DeleteModal packageNo={selectedPackage?.package_no} onClose={closeModal} onConfirm={deletePackage} />
      )}

      <div className="h-screen overflow-y-auto border rounded-lg p-4 lg:mb-10 bg-[#EEF1F6]">
        <div className="flex flex-wrap gap-3">
          {packages.map(pkg => (
            <div key={pkg.package_no} className="relative border p-4 rounded-lg shadow-md flex flex-col items-center space-y-2 w-[200px]">
              <div className="absolute top-2 right-2">
                <button onClick={() => setMenuVisible(menuVisible === pkg.package_no ? null : pkg.package_no)}>
                  <FaEllipsisV />
                </button>
                {menuVisible === pkg.package_no && (
                  <div className="absolute top-6 right-0 bg-white shadow-md border rounded-md w-24">
                    <button className="block w-full px-2 py-1 text-left hover:bg-gray-200" onClick={() => openModal('edit', pkg)}>Edit</button>
                    <button className="block w-full px-2 py-1 text-left hover:bg-gray-200" onClick={() => openModal('delete', pkg)}>Delete</button>
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
          ))}
        </div>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end gap-2 mt-2">
          <button className="border border-black px-7 py-2 rounded-full" onClick={onClose}>Cancel</button>
          <button className="bg-[#001F2A] text-white px-7 py-2 rounded-full" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

function PackageForm({ data, onChange }) {
  return (
    <div className="p-4">
      {['package_name', 'mrp', 'offer', 'features', 'duration'].map(field => (
        <input key={field} type="text" name={field} value={data[field]} onChange={onChange} className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200" placeholder={field.replace('_', ' ')} />
      ))}
    </div>
  );
}

function DeleteModal({ packageNo, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[350px] flex flex-col">
        <div className="flex justify-center">
          <IconTrashX className="text-red-500" size={48} />
        </div>
        <p className="text-center font-bold mb-3 mt-2">Delete</p>
        <p className="text-center font-bold mb-3">Package ID: {packageNo}</p>
        <p className="text-center">Are you sure? If you delete this package, you can't retrieve the data.</p>
        <div className="flex justify-center gap-2 mt-2">
          <button className="border border-red-600 text-red-600 px-7 py-2 rounded-full" onClick={onClose}>Cancel</button>
          <button className="bg-[#001F2A] text-white px-7 py-2 rounded-full" onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Packages;
