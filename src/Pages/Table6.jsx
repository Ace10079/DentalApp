import React, { useState, useMemo, useEffect } from "react";
import { api } from "../Host";
import { format } from "date-fns";
import { IconEye } from "@tabler/icons-react";
import * as XLSX from "xlsx";
function Table6() {
  const rowsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [rows, setRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isReply, setIsReply] = useState(false); // Track if modal is for reply
  const [reply, setReply] = useState("");
  const [previousReply, setPreviousReply] = useState(""); // Store previous reply
  const [isEdit, setIsEdit] = useState(false); // Track if modal is in edit mode
const [editedDetails, setEditedDetails] = useState(""); // Store edited details
const [status, setStatus] = useState(selectedRow?.status || "new");

const handleStatusUpdate = async () => {
  try {
    const response = await api.put(`/support/update?ticket_no=${selectedRow.ticket_no}`, {
      status,
    });
    if (response.status === 200) {
      alert("Status updated successfully!");
      setIsModalVisible(false);
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Failed to update status.");
  }
};

const downloadExcel = () => {
  const data = rows.map(dentist => ({
    "Ticket No": dentist.ticket_no,
    "Raissed By": dentist.dentist_name,
    "Status": dentist.status,
    "Subject": dentist.details,
    "Date & Time": format(new Date(dentist.createdAt), 'dd MMMM yyyy - hh:mm a'),
  }));

  // Create a worksheet from the data
  const ws = XLSX.utils.json_to_sheet(data);
  // Create a workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Support");

  // Generate the Excel file and prompt download
  XLSX.writeFile(wb, "Support_Data.xlsx");
};


  useEffect(() => {
    const savedStatus = localStorage.getItem("status");
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const response = await api.get("/support/all");
        setRows(response.data.data.reverse());
      } catch (error) {
        console.error("Failed to fetch support:", error);
      }
    };
    fetchSupport();
  }, []);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    localStorage.setItem("status", newStatus);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      row.dentist_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, rows]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy - hh:mm a");
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPaginatedRows = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredRows.slice(startIndex, endIndex);
  };

  const handleReplySubmit = async () => {
    try {
      await api.post("/reply/post", {
        ticket_no: selectedRow.ticket_no,
        reply: reply,
      });
      alert("Reply submitted successfully!");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to submit reply:", error);
      alert("Failed to submit reply. Please try again.");
    }
  };

  const fetchPreviousReply = async (ticketNo) => {
    try {
      const response = await api.get(`/reply/get?ticket_no=${ticketNo}`);
      if (response.data && response.data.reply) {
        setPreviousReply(response.data.reply); // Store previous reply
      }
    } catch (error) {
      console.error("Failed to fetch previous reply:", error);
    }
  };

  const handleOpenModal = (row, mode) => {
    setSelectedRow(row);
    setIsModalVisible(true);
  
    if (mode === "reply") {
      setIsReply(true);
      setIsEdit(false);
      fetchPreviousReply(row.ticket_no);
    } else if (mode === "edit") {
      setIsEdit(true);
      setIsReply(false);
      setEditedDetails(row.details); // Pre-fill the input with existing details
    } else {
      setIsReply(false);
      setIsEdit(false);
    }
  };
  const handleEditSubmit = async () => {
    try {
      await api.put("/support/update", {
        ticket_no: selectedRow.ticket_no,
        details: editedDetails, // Send updated details
      });
      alert("Details updated successfully!");
      setIsModalVisible(false);
      // Refresh the data
      const response = await api.get("/support/all");
      setRows(response.data.data);
    } catch (error) {
      console.error("Failed to update details:", error);
      alert("Failed to update. Please try again.");
    }
  };
    

  
  return (
    <div className="lg:m-3 mt-14 m-3 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Support</h1>
        <input
          type="text"
          placeholder="Search response"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <table className="overflow-auto min-w-full divide-y divide-black border-black border">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              S.no
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Ticket no
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Date & Time
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Raised by
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Status
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Subject
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedRows().map((row, index) => (
            <tr key={row._id}>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {index + 1 + (currentPage - 1) * rowsPerPage}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.ticket_no || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {formatDate(row.createdAt)}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.dentist_name || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.status || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0] break-words overflow-wrap break-word">
  {row.details
    ? row.details.split(" ").length > 10
      ? row.details.split(" ").slice(0, 10).join(" ") + "..."
      : row.details
    : "N/A"}
</td>


              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                <button
                  className="mx-2 text-black"
                  onClick={() => handleOpenModal(row, false)} // Open details modal
                >
                  <IconEye />
                </button>
              </td>
            </tr>
          ))}
          {filteredRows.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-3">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span className="px-3 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
        </div>
        
      </div>

      {isModalVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{isReply ? "Reply" : "Details"}</h2>
        <button
          className="text-red-500"
          onClick={() => setIsModalVisible(false)}
        >
          Close
        </button>
      </div>
      {isReply ? (
        <>
          <textarea
            className="w-full border px-2 py-1 rounded mb-4"
            value={reply || previousReply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply here..."
          ></textarea>
          <button
            onClick={handleReplySubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Reply
          </button>
        </>
      ) : (
        <>
          <div className="mb-5">
            <label htmlFor="ticketNo" className="font-semibold">
              Phone Number
            </label>
            <p
              id="ticketNo"
              className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200"
            >
              {selectedRow?.phone || "N/A"}
            </p>
          </div>

          <div className="mb-5">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <select
              id="status"
              className="w-full border px-2 py-1 mb-5 rounded-md bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>

          <div className="mb-5">
            <label htmlFor="raisedBy" className="font-semibold">
              Raised By
            </label>
            <p
              id="raisedBy"
              className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200"
            >
              {selectedRow?.dentist_name || "N/A"}
            </p>
          </div>

          <div className="mb-5">
            <label htmlFor="details" className="font-semibold">
              Details
            </label>
            <p
              id="details"
              className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200"
            >
              {selectedRow?.details || "N/A"}
            </p>
          </div>

          <div className="mb-5">
            <label htmlFor="attachments" className="font-semibold">
              Attachments
            </label>
            <div
              id="attachments"
              className="w-full border px-2 py-1 mb-5 rounded-md bg-slate-200 flex justify-center items-center"
            >
              {selectedRow?.attachment ? (
                <img
                  src={`${api.defaults.baseURL}/images/${selectedRow.attachment}`}
                  alt="Attachment"
                  className="w-16 h-16 object-cover"
                />
              ) : (
                <span>No Attachment</span>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              className="border border-black text-white bg-black px-9 py-2 rounded-full"
              onClick={() => setIsReply(true)}
            >
              Reply
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}

    </div>
  );
}

export default Table6;
