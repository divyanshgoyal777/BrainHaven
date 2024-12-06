import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';

const ResourcePdf = () => {
  const { resourceId, activeSemester, selectedSubject, section } = useParams();
  const newresource = resourceId.split('|')[0];

  // State to hold the fetched data
  const [pdfLink, setPdfLink] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the JSON data on mount
  useEffect(() => {
    fetch('/resourcesLink.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch JSON');
        }
        return response.json();
      })
      .then((data) => {
        setPdfLink(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
        setLoading(false);
      });
  }, []);

  // Handle the case when JSON is still loading or not available
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="mt-40 my-10 flex flex-col items-center">
          <p className="text-white">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const pdfDetails = pdfLink?.[newresource]?.[section]?.[activeSemester]?.[selectedSubject];

  return (
    <div>
      <Navbar />
      <div className="mt-40 my-10 flex flex-col items-center">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg">
          {selectedSubject}
        </h1>
        <div className="my-10">
          {pdfDetails ? (
            <iframe
              src={pdfDetails}
              width="600"
              height="400"
              title={`${activeSemester} - ${selectedSubject} PDF`}
              style={{ border: 'none' }}
            />
          ) : (
            <p className="text-white">No PDF available for this</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResourcePdf;
