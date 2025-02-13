import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const PdfViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pdfUrls = JSON.parse(searchParams.get("pdfUrls") || "[]");
  const [loading, setLoading] = useState(Array(pdfUrls.length).fill(true));
  const [imageData, setImageData] = useState(Array(pdfUrls.length).fill(null));
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    document.title = "BrainHaven - Resources Viewer";
  }, []);

  const handleImageLoad = (index, event) => {
    setLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const maxWidth = 595;
    const scaleFactor = maxWidth / event.target.width;

    canvas.width = maxWidth;
    canvas.height = event.target.height * scaleFactor;

    context.drawImage(event.target, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

    setImageData((prev) => {
      const updated = [...prev];
      updated[index] = dataUrl;
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

  const downloadPDF = () => {
    if (imageData.includes(null)) return;

    setIsDownloading(true);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const addImageToPDF = (index) => {
      if (index >= imageData.length) {
        pdf.save("BrainHaven_Resource.pdf");
        setIsDownloading(false);
        return;
      }

      const imgData = imageData[index];
      if (imgData) {
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (index > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      }
      setTimeout(() => addImageToPDF(index + 1), 100);
    };

    addImageToPDF(0);
  };

  if (!pdfUrls || pdfUrls.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No PDF available to display.
      </p>
    );
  }

  return (
    <div className="mt-40 px-1">
      <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-4">
        Resource PDF
      </h2>

      {/* <div className="flex justify-center mb-10 pr-5">
        <button
          onClick={downloadPDF}
          className={`bg-gradient-to-tr from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
            isDownloading || loading.includes(true)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={isDownloading || loading.includes(true)}
        >
          {isDownloading
            ? "Downloading..."
            : loading.includes(true)
            ? "Preparing PDF..."
            : "Download PDF"}
        </button>
      </div> */}

      <div className="flex flex-col items-center mt-10 gap-3 sm:gap-5">
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
              className={`sm:w-[80%] w-full h-auto rounded-lg shadow-lg ${
                loading[index] ? "opacity-0" : "opacity-100"
              }`}
              onLoad={(e) => handleImageLoad(index, e)}
              onError={() => handleImageError(index)}
              style={{ transition: "opacity 0.3s ease-in-out" }}
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfViewer;
