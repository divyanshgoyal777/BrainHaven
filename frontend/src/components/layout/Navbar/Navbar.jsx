import React from 'react'
import logo from '../../../assets/img/BrainWaveFaviconNoBackground.png'
const Navbar = () => {
  return (
   <>
    <nav className='flex justify-center absolute top-0 h-[12%] w-[100%] py-5 px-8 items-center m-auto gap-48'>
        <div className='text-white'><img src={logo} alt="" className='w-10'/></div>
        <div className='flex '>
            <ul className='text-gray-400 flex justify-evenly gap-12 font-semibold'>
                <li>Home</li>
                <li>Resources</li>
                <li>Events</li>
                <li>Hackmate</li>
            </ul>
        </div>

        <div className='flex gap-4'>
            <button className='bg-gradient-to-r from-indigo-600 to-purple-600
         text-white font-medium py-2 px-4 rounded-md shadow-md '>Sign Up</button>
            <button className='bg-gradient-to-r from-indigo-600 to-purple-600
         text-white font-medium py-2 px-4 rounded-md shadow-md '>Log In</button>
        </div>
    </nav>
   </>
  )
}

export default Navbar