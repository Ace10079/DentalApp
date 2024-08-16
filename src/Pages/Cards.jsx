import React, { useState, useEffect } from 'react';
import { IconUserPlus, IconUsers, IconSearch } from '@tabler/icons-react';


function Cards() {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 font-bold text-sm mt-3 lg:mx-2 mx-20">
      <div className="border-solid border-2 items-center rounded-lg flex justify-between bg-white hover:shadow-2xl w-64 lg:w-72 p-3">
        <div>
          <p>Total No. of Doctors</p>
          <p>10</p>
        </div>
        <div className="mt-1 text-white">
          <IconUserPlus stroke={2} className="h-9 w-9 bg-[#001F2A] p-1 rounded-full" />
        </div>
      </div>
      <div className="border-solid border-2 items-center rounded-lg flex justify-between bg-white hover:shadow-2xl w-64 lg:w-72 p-3">
        <div>
          <p>Total No. of Subscriptions</p>
          <p>10</p>
        </div>
        <div className="mt-1 text-white">
          <IconUsers stroke={2} className="h-9 w-9 bg-[#001F2A] p-1 rounded-full" />
        </div>
      </div>
      <div className="border-solid border-2 items-center rounded-lg flex justify-between bg-white hover:shadow-2xl w-64 lg:w-72 p-3">
        <div>
          <p>Total No. of Searches</p>
          <p>10</p>
        </div>
        <div className="mt-1 text-white">
          <IconSearch stroke={2} className="h-9 w-9 bg-[#001F2A] p-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Cards;
