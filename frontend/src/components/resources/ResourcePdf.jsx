import React from 'react'
import { useParams } from 'react-router-dom'

const ResourcePdf = () => {
    const activeSection=useParams();
    const selectedSemester=useParams();


  return (
    <div className='text-white'>
      {activeSection}
    </div>
  )
}

export default ResourcePdf
