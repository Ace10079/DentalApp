import React from 'react'

import { IconDotsVertical } from '@tabler/icons-react';

function Table2() {
    const rows = Array.from({ length: 7 }).map((_, index) => ({
        serial: index + 1,
        customerId: '#543568',
        customerName: 'Karan',
        dateTime: '20, Mar 04:23',
        phoneNumber: '00000 00000',
        emailId: 'minions10karan@gmail.com',
      }));
    
      return (
        <div className='lg:m-3 mt-14 m-3 overflow-auto'>
          <p className='p-2 font-bold font-[Century Gothic]'>
            Searches
          </p>
          <div className='p-1 max-h-[350px]'>
            <table className='min-w-full divide-y divide-black border-black border'>
              <thead className='bg-gray-50'>
                <tr className=''>
                  <th className="border border-gray-400 px-1 py-1 text-center text-sm text-black bg-[#E7E7E7]">S.no</th>
                  <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Dentist ID</th>
                  <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Dentist Name</th>
                  <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Date & Time</th>
                  <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Phone Number</th>
                  <th className="border border-gray-500 px-1 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]">Email ID</th>
                  <th className="border border-gray-500 px-6 py-1 text-center text-sm text-black tracking-wider bg-[#E7E7E7]"><IconDotsVertical stroke={1} /></th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-black'>
                {rows.slice(0, 5).map((row) => (
                  <tr key={row.serial}>
                    <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.serial}</td>
                    <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.customerId}</td>
                    <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.customerName}</td>
                    <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.dateTime}</td>
                    <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.phoneNumber}</td>
                    <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]">{row.emailId}</td>
                    <td className="border text-center border-gray-200 px-6 py-3 text-sm text-[#A0A0A0]"><IconDotsVertical stroke={1} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default Table2
