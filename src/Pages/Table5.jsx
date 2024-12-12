import React, { useState, useMemo, useEffect } from 'react';
import { api } from '../Host'; // Import the API
import { format } from 'date-fns';

function Table5() {
    const rowsPerPage = 5; // Define the number of rows per page
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [rows, setRows] = useState([]); // State to hold the fetched data

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await api.get('/feedback/get'); // Fetch all feedback data from your backend
                setRows(response.data.data); // Store the fetched data in state
            } catch (error) {
                console.error("Failed to fetch feedback:", error);
            }
        };
        fetchFeedback();
    }, []);

    // Filter rows based on search query
    const filteredRows = useMemo(() => {
        return rows.filter(row =>
            row.dentist_name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, rows]);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMMM yyyy - hh:mm a');
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

    return (
        <div className='lg:m-3 mt-14 m-3 overflow-auto'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Feedback</h1>
                <input
                    type="text"
                    placeholder="Search response"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 rounded"
                />
            </div>

            <table className='min-w-full divide-y divide-black border-black border'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className="border border-gray-400 px-1 py-1 text-center text-sm text-black bg-[#E7E7E7]">S.no</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Dentist ID.</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Dentist Name</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Dentist Phone</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Response</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Comment</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Date</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-black'>
                    {getPaginatedRows().map((row, index) => (
                        <tr key={row._id}>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.dentist_reg_number || 'N/A'}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.dentist_name || 'N/A'}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.phone || 'N/A'}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.response || 'N/A'}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.comment || 'N/A'}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{formatDate(row.date)}</td>
                        </tr>
                    ))}
                    {filteredRows.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-3">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end space-x-2">
                <button
                    className={`px-3 py-2 rounded bg-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-3 py-2">Page {currentPage} of {totalPages}</span>
                <button
                    className={`px-3 py-2 rounded bg-gray-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Table5;
