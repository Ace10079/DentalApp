import React from 'react';

function Profile() {
  return (
    <div className='flex lg:flex-row flex-col p-4 gap-5'>
      <div className='lg:w-44 lg:h-[450px] bg-white p-3 rounded-md'>
        <p className='bg-[#EEF1F6] px-5 py-2 font-bold rounded-md'>My Profile</p>
      </div>
      <div className='w-full bg-white h-[450px] rounded-md'>
        <div className="p-10">
          <label htmlFor="" className="font-semibold">
          Name
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
            placeholder="Name"
          />
         
          <label htmlFor="" className="font-semibold">
            Email ID
          </label>
          <input
            type="text"
            className="w-full border px-2 py-1 mb-2 rounded-md bg-slate-200"
            placeholder="abc@gmail.com"
          />
         
           <div className="flex justify-center gap-2 lg:mt-5 mt-12">
                <button
                  className="border border-black text-black px-7 py-2 ml-2 rounded-full "
                  onClick={() => setEditModal(false)}
                >
                  Logout
                </button>
                
              </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
