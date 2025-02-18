import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { api } from '../Host';

function Profile() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedAdminId = localStorage.getItem('adminId') || '';
    const storedAdminName = localStorage.getItem('adminName') || '';
    const storedAdminEmail = localStorage.getItem('adminEmail') || '';

    console.log("Stored Admin ID:", storedAdminId);
    console.log("Stored Admin Name:", storedAdminName);
    console.log("Stored Admin Email:", storedAdminEmail);

    setAdminId(storedAdminId);
    setAdminName(storedAdminName);
    setAdminEmail(storedAdminEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    navigate('/login');
  };

  const handleUpdateProfile = async () => {
    if (!adminId) {
      alert('Admin ID not found!');
      return;
    }

    const updateData = {
      admin_name: adminName,
      email: adminEmail,
      old_password: oldPassword,
      new_password: newPassword
    };

    try {
      const response = await api.put(`/admin/update?admin_id=${adminId}`, updateData);

      if (response.status === 200) {
        alert('Profile updated successfully');

        // Update local storage
        localStorage.setItem('adminName', adminName);
        localStorage.setItem('adminEmail', adminEmail);

        // Reset password fields after update
        setOldPassword('');
        setNewPassword('');
        setIsEditing(false);
      } else {
        alert(response.data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="flex lg:flex-row flex-col p-4 gap-5">
      <div className="lg:w-44 lg:h-[450px] bg-white p-3 rounded-md">
        <p className="bg-[#EEF1F6] px-5 py-2 font-bold rounded-md">My Profile</p>
      </div>
      <div className="w-full bg-white h-[450px] rounded-md">
        <div className="p-10">
          <label className="font-semibold">Admin ID</label>
          <input type="text" value={adminId} className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200" readOnly />

          <label className="font-semibold">Name</label>
          <input type="text" value={adminName} className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200" readOnly />

          <label className="font-semibold">Email</label>
          <input type="text" value={adminEmail} className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200" readOnly />

          <label className="font-semibold flex items-center">
            Old Password
            <FaEdit className="ml-2 text-blue-500 cursor-pointer" onClick={() => setIsEditing(true)} />
          </label>
          <input type="password" value={oldPassword} className="w-full border px-2 py-1 mb-2 rounded-md"
            onChange={(e) => setOldPassword(e.target.value)} />

          <label className="font-semibold flex items-center">
            New Password
            <FaEdit className="ml-2 text-blue-500 cursor-pointer" onClick={() => setIsEditing(true)} />
          </label>
          <input type="password" value={newPassword} className="w-full border px-2 py-1 mb-2 rounded-md"
            onChange={(e) => setNewPassword(e.target.value)} />

          <div className="flex justify-center gap-2 lg:mt-5 mt-12">
            <button className="border border-black text-black px-7 py-2 rounded-full" onClick={handleLogout}>
              Logout
            </button>
            <button className="bg-blue-500 text-white px-7 py-2 rounded-full" onClick={handleUpdateProfile}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
