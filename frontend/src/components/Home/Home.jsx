import React from 'react'
import Navbar from '../layout/Navbar/Navbar'
import Footer from '../layout/Footer/Footer'
import './Home.css'
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='mt-36 mx-20'>
        <div className='Page-1 text-white mb-40'>
            <div className=''>
                <div className='w-[60%]'>
                <div className='text-[3rem] font-bold leading-[1.2]'>BrainWave – Ignite Your Tech Journey with BrainWave</div>
                <div className='text-[1.3rem] py-5'>Your go-to platform for learning resources, coding roadmaps, and hackathon events.</div> 
                </div>
            </div>
             <div className='flex gap-5 items-center my-6' >
                <button className='px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md'>Explore Resources</button>
                <div>or</div>
                <button className='px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md'>Join a Hackathon</button>
             </div>
               </div>
        <div className='Page2 my-32 flex flex-col justify-center items-center h-[40vh] text-center'>
            <div className='text-white text-4xl font-bold mb-5'>Whar is BrainWave?</div>
            <div className='text-white text-lg leading-relaxed max-w-2xl mx-auto'>BrainWave is your ultimate hub for tech enthusiasts, offering resources,
                 expert roadmaps, and event updates. Whether you're learning to code, preparing
                  for a hackathon, or exploring the latest tech trends, we've got everything you need.</div>
        </div>
        <div className='Page2 my-32 flex flex-col justify-center items-center h-[40vh] text-center'>
            <div className='text-white text-4xl font-bold mb-5'>Upcoming Hackathons & Events</div>
            <div className='text-white text-lg leading-relaxed max-w-2xl mx-auto'>
            Stay updated with the latest hackathons and tech events. Whether you're looking to 
            participate in coding challenges, learn from top industry professionals, or network 
            with fellow tech enthusiasts, this section keeps you informed on all the opportunities.
             Don’t miss out on the chance to showcase your skills and collaborate with others.
            </div>
            <button className='px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md my-5'>View all Hackathon</button>
        </div>
        <div className='Page2 my-32 flex flex-col justify-center items-center h-[40vh] text-center'>
            <div className='text-white text-4xl font-bold mb-5'>Join BrainWave Today</div>
            <div className='text-white text-lg leading-relaxed max-w-2xl mx-auto'>
            Ready to kick-start your tech journey or enhance your skills? Join BrainWave now and gain access to a wealth of resources, events, and expert advice tailored just for you.
            </div>
            <div className=''>
            <div className='text-white text-lg mt-3'> Sign up for free and start exploring.</div>
                <button className='px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md my-2'>Get Started</button>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home