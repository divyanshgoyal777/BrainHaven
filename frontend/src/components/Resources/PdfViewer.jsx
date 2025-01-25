import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PdfViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pdfUrls = JSON.parse(searchParams.get("pdfUrls") || "[]");

  const [loading, setLoading] = useState(Array(pdfUrls.length).fill(true));

  useEffect(() => {
    document.title = "BrainHaven - Resources Viewer";
  }, []);

  const handleImageLoad = (index) => {
    setLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleImageError = (index) => {
    setLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  if (!pdfUrls || pdfUrls.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No PDF available to display.
      </p>
    );
  }

  return (
    <div>
      <div className="mt-40 px-1">
        <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Resource PDF
        </h2>
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          {pdfUrls.map((url, index) => (
            <div
              key={index}
              className="w-[90%] sm:w-full max-w-4xl flex justify-center items-center relative"
            >
              {loading[index] && (
                <div className="absolute z-10 flex justify-center items-center bg-gray-100 w-full h-full rounded-lg">
                  <p className="text-gray-500">Loading...</p>
                </div>
              )}
              <img
                src={url}
                title={`Resource PDF - Page ${index + 1}`}
                className={`sm:w-[80%] w-full h-auto sm:h-auto rounded-lg shadow-lg ${
                  loading[index] ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                style={{ transition: "opacity 0.3s ease-in-out" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
