import React, { useState, useMemo } from 'react';

function Table3() {
    const rowsPerPage = 5; // Define the number of rows per page
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const rows = Array.from({ length: 20 }).map((_, index) => ({
        serial: index + 1,
        customerId: '#543568',
        customerName: 'Karan',
        status: 'Yearly',
        dateTime: '20, Mar 04:23',
        phoneNumber: '00000 00000',
        transactionid: "#3902874",
        transactionstatus: "20, Mar 04:23",
        emailId: 'minions10karan@gmail.com',
    }));

    // Filter rows based on search query
    const filteredRows = useMemo(() => {
        return rows.filter(row =>
            row.customerId.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, rows]);

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
        <div className='lg:m-3 mt-14 m-3 overflow-auto'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Subscription</h1>
                <input
                    type="text"
                    placeholder="Search by ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-4 py-2 rounded-md"
                />
            </div>

            <table className='min-w-full divide-y divide-black border-black border'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className="border border-gray-400 px-1 py-1 text-center text-sm text-black bg-[#E7E7E7]">S.no</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Customer ID</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Customer Name</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Status</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Date & Time</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Transaction Id</th>
                        <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Transaction Status</th>
                        <th className="border border-gray-500 px-6 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Expiry Date</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-black'>
                    {getPaginatedRows().map((row) => (
                        <tr key={row.serial}>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.serial}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.customerId}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.customerName}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.status}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.dateTime}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.transactionid}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.transactionstatus}</td>
                            <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.dateTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
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

export default Table3;
