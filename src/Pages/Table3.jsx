import React, { useState, useMemo, useEffect } from "react";
import { api } from "../Host"; // Import the API
import { format } from "date-fns";
import * as XLSX from "xlsx";
function Table3() {
  const rowsPerPage = 5; // Define the number of rows per page
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [rows, setRows] = useState([]); // State to hold the fetched data

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await api.get("/subscription/get"); // Fetch all subscriptions from your backend
        setRows(response.data.data.reverse()); // Store the fetched data in state
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      }
    };
    fetchSubscriptions();
  }, []);
  const downloadExcel = () => {
    const data = rows.map(dentist => ({
      "Customer ID": dentist.customer_id,
      "Customer Name": dentist.customer_name,
      "Status": dentist.status,
      "Transaction Status": dentist.transaction_status,
      "Transaction Id":dentist.transaction_id,
      "Date & Time": format(new Date(dentist.createdAt), 'dd MMMM yyyy - hh:mm a'),
      "Expiry Date": format(new Date(dentist.expiry_date), 'dd MMMM yyyy - hh:mm a'),
    }));

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(data);
    // Create a workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subscriptions");

    // Generate the Excel file and prompt download
    XLSX.writeFile(wb, "Subscriptions_Data.xlsx");
  };

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    return rows.filter(
      (row) =>
        row.customer_id &&
        row.customer_id.toLowerCase().includes(searchQuery.toLowerCase()) // Check if customer_id exists
    );
  }, [searchQuery, rows]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy - hh:mm a");
  };

  // Calculate total pages based on filtered rows
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Get paginated rows based on current page
  const getPaginatedRows = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredRows.slice(startIndex, endIndex);
  };

  return (
    <div className="lg:m-3 mt-14 m-3 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subscription</h1>
        <input
          type="text"
          placeholder="Search by Customer ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
      </div>

      <table className="min-w-full divide-y divide-black border-black border">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-400 px-1 py-1 text-center text-sm text-black bg-[#E7E7E7]">
              S.no
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Customer ID
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Customer Name
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Status
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Date & Time
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Transaction ID
            </th>
            <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Transaction Status
            </th>
            <th className="border border-gray-500 px-6 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">
              Expiry Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-black">
          {getPaginatedRows().map((row, index) => (
            <tr key={index}>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {index + 1 + (currentPage - 1) * rowsPerPage}
              </td>

              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.customer_id || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.customer_name || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.status || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.createdAt ? formatDate(row.createdAt) : "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.transaction_id || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.transaction_status || "N/A"}
              </td>
              <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">
                {row.expiry_date ? formatDate(row.expiry_date) : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-1 flex justify-between space-x-2">
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
          className={`px-3 py-2 rounded bg-gray-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-3 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-3 py-2 rounded bg-gray-300 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default Table3;
