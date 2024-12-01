import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='h-[45vh] relative bottom-0 text-white flex flex-col justify-center items-center bg-[#10051a]'>
    <div className='flex justify-around gap-32'>
     <div>
        <div className='font-bold my-1'>Contact Information</div>
        <div>Email :</div>
        <div>Phone :</div>
        <div>Address :</div>
     </div>
     <div>
        <div className='font-bold my-1'>Follow Us</div>
        <div>Linkedin :</div>
        <div>Instagram :</div>
        <div>You Tube :</div>
     </div>
     <div className='w-[30%]'>
        <div className='font-bold my-1'>Resources</div>
        <div>FAQ: Find answers to frequently asked questions about BrainWave.</div>
        <div>Terms & Conditions: Learn about the rules and policies that govern your use of BrainWave.    </div>
        <div>Privacy Policy: Understand how we protect your data and privacy.</div>
     </div>
     </div>
     <div className='mt-5'>© 2024 BrainWave, All rights reserved.</div>
    </div>
    </>
  )
}

export default Footer

