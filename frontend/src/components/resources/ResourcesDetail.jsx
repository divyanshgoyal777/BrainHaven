import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../layout/Navbar/Navbar'
import Footer from '../layout/Footer/Footer'

const ResourcesDetail = () => {
  const { resourceId } = useParams()
  return (
    <div>
      <Navbar />
      <div className='mt-40 flex justify-center flex-col'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <h1 className='bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg '>{resourceId.split('|')[0].toUpperCase().replace('-', ' ')}</h1>
          <h2 className='bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent'>{resourceId.split('|')[1].toUpperCase()} </h2>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ResourcesDetail
