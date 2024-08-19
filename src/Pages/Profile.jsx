import React from 'react';

function Profile() {
  return (
    <div className='flex p-4 gap-5'>
      <div className='w-44 h-[450px] bg-white p-3 rounded-md'>
        <p className='bg-[#EEF1F6] px-5 py-2 font-bold rounded-md'>My Profile</p>
      </div>
      <div className='w-full bg-white h-[450px] rounded-md'>
        <div className="p-10">
          <label htmlFor="" className="font-semibold">
            Dentist Name
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
            placeholder="Name"
          />
          <label htmlFor="" className="font-semibold">
            Dentist Register Number
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
            placeholder="3546789"
          />
          <label htmlFor="" className="font-semibold">
            Email ID
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
            placeholder="abc@gmail.com"
          />
          <label htmlFor="" className="font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
            placeholder="0000000"
          />
          <label htmlFor="" className="font-semibold">
            Password
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
            placeholder="***** *****"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
