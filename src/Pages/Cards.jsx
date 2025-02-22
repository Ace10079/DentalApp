import React, { useState, useEffect } from 'react';
import { IconUserPlus, IconUsers, IconSearch } from '@tabler/icons-react';
import axios from 'axios'; // Add this import for axios
import { api } from '../Host';

function Cards() {
 
  const [dentists, setDentists] = useState([]);
  const [totalDentists, setTotalDentists] = useState(0);
  const [subscription, setsubscription] = useState([]);
  const [totalsubscription, setTotalsubscription] = useState(0); // State to store the total number of dentists

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await api.get('/dentist/get'); // Fetch all dentists from your backend
        const fetchedDentists = response.data.data;
        setDentists(fetchedDentists);
        setTotalDentists(fetchedDentists.length); // Set the total number of dentists
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
      }
    };
    fetchDentists();
  }, []);
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await api.get('/subscription/get'); // Fetch all dentists from your backend
        const fetchedDentists = response.data.data;
        setsubscription(fetchedDentists);
        setTotalsubscription(fetchedDentists.length); // Set the total number of dentists
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
      }
    };
    fetchDentists();
  }, []);

  
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 font-bold text-sm mt-3 lg:mx-2 mx-16">
      <div className="border-solid border-2 items-center rounded-lg flex justify-between bg-white hover:shadow-2xl w-64 lg:w-72 p-3">
        <div>
          <p>Total No. of Doctors</p>
          <p>{totalDentists}</p> {/* Updated to show totalCustomers */}
        </div>
        <div className="mt-1 text-white">
          <IconUserPlus stroke={2} className="h-9 w-9 bg-[#001F2A] p-1 rounded-full" />
        </div>
      </div>
      <div className="border-solid border-2 items-center rounded-lg flex justify-between bg-white hover:shadow-2xl w-64 lg:w-72 p-3">
        <div>
          <p>Total No. of Subscriptions</p>
          <p>{totalsubscription}</p>
        </div>
        <div className="mt-1 text-white">
          <IconUsers stroke={2} className="h-9 w-9 bg-[#001F2A] p-1 rounded-full" />
        </div>
      </div>
      <div className="border-solid border-2 items-center rounded-lg flex justify-between bg-white hover:shadow-2xl w-64 lg:w-72 p-3">
        <div>
          <p>Total No. of Searches</p>
          <p>{totalDentists}</p> {/* Updated to show totalSearches */}
        </div>
        <div className="mt-1 text-white">
          <IconSearch stroke={2} className="h-9 w-9 bg-[#001F2A] p-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Cards;
