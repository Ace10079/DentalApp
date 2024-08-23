import React, { useState } from "react";
import { IconDotsVertical, IconTrashX } from "@tabler/icons-react";

function Table1() {
  const [menuVisible, setMenuVisible] = useState(null);
  const [EditModal, setEditModal] = useState(false);
  const [ViewModal, setViewModal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);

  const rows = Array.from({ length: 20 }).map((_, index) => ({
    serial: index + 1,
    customerId: "#543568",
    customerName: "Karan",
    dateTime: "20, Mar 04:23",
    phoneNumber: "00000 00000",
    emailId: "minions10karan@gmail.com",
  }));

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const handleEdit = () => {
    setEditModal(true);
    setMenuVisible(null);
  };
  const handleView = () => {
    setViewModal(true);
    setMenuVisible(null);
  };
  const handleDelete = () => {
    setDeleteModal(true);
    setMenuVisible(null);
  };
  return (
    <div>
      {/* Modal for Edit */}
      {EditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex">
              <h2 className="text-xl font-bold mb-4 ">Edit</h2>
              
            </div>

            <div className="p-6">
            <label htmlFor="" className="font-semibold">
                Dentist Name
              </label>
              <input
                type="text"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="Name"
              />
              <label htmlFor="" className="font-semibold">
                Phone Number:
              </label>
              <input
                type="text"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="Telephone Call"
              />
              <label htmlFor="" className="font-semibold">
                Email ID:
              </label>
              <input
                type="text"
                className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
                placeholder="abc@gmail.com"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="border border-black text-black px-7 py-2 ml-2 rounded-full "
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#001F2A] text-white px-7 py-2 rounded-full"
                  onClick={() => setEditModal(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {ViewModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex">
              <h2 className="text-xl font-bold mb-4 ">View</h2>
            </div>

            <div className="p-6">
            <label htmlFor="" className="font-semibold">
                Dentist Name
              </label>
              <p className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">Name</p>
              <label htmlFor="" className="font-semibold">
                Phone Number
              </label>
              <p className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">Telephone Call</p>
              <label htmlFor="" className="font-semibold">
                Email ID
              </label>
              <p className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200">abc@gmail.com</p>
             
              <div className="flex justify-center mt-5">
                <button
                  className="border border-black text-white bg-black px-9 py-2  rounded-full "
                  onClick={() => setViewModal(false)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {DeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[350px] flex flex-col">
            <div className="flex justify-center">
              <IconTrashX className="text-red-500" />
            </div>
            <p className="text-center font-bold mb-3 mt-2">Delete</p>
            <p className="text-center font-bold mb-3">User Name</p>

            <p className="text-center">
              Are you sure? If you delete dentist ID,you can't retrieve your
              data
            </p>
            <div className="flex justify-center gap-2 mt-2">
                <button
                  className="border border-red-600 text-red-600 px-7 py-2 rounded-full"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#001F2A] text-white px-7 py-2 rounded-full"
                  onClick={() => setDeleteModal(false)}
                >
                  Continue
                </button>
              </div>
          </div>
        </div>
      )}

<div className="lg:m-3 mt-14 m-3">
  <p className="p-2 font-bold font-[Century Gothic]">Dentist</p>

  {/* Scrollable Table */}
  <div className="p-1 max-h-[350px] lg:max-h-[500px] h-[calc(100vh-200px)] overflow-y-auto">
    <table className="min-w-full divide-y divide-black border-black border table-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="border border-gray-400 px-1 py-1 text-center text-sm text-black bg-[#E7E7E7]">
            S.no
          </th>
          <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
            Dentist ID
          </th>
          <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
            Dentist Name
          </th>
          <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
            Date & Time
          </th>
          <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
            Phone Number
          </th>
          <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
            Email ID
          </th>
          <th className="border border-gray-500 px-6 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
            <IconDotsVertical stroke={1} />
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-black">
        {rows.map((row, index) => (
          <tr key={row.serial}>
            <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">
              {row.serial}
            </td>
            <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">
              {row.customerId}
            </td>
            <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">
              {row.customerName}
            </td>
            <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">
              {row.dateTime}
            </td>
            <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">
              {row.phoneNumber}
            </td>
            <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0]">
              {row.emailId}
            </td>
            <td className="border text-center border-gray-200 px-4 lg:px-6 py-3 text-sm text-[#A0A0A0] relative">
              <div onClick={() => toggleMenu(index)} className="cursor-pointer">
                <IconDotsVertical stroke={1} />
              </div>
              {menuVisible === index && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul>
                    <li
                      onClick={handleView}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      View
                    </li>
                    <li
                      onClick={handleEdit}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </li>
                    <li
                      onClick={handleDelete}
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


</div>
  );
}

export default Table1;
