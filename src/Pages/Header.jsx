import React from 'react'
import { IconUserCircle } from '@tabler/icons-react';

function Header() {
  return (
    <div>
    <div className='mt-1 lg:m-3 flex justify-end text-black'>
      <button className='mr-2 lg:mr-1  p-2 rounded-lg font-bold flex gap-1'>
        <div>
          <p>{'Profile Name'}</p> 
        </div>
        <div className='bg-[#99E9F5] rounded-full p-1'>
          <IconUserCircle stroke={2} className='' />
        </div>
      </button>
    </div>
  </div>
  )
}

export default Header
