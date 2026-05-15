import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PdfViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pdfUrl = searchParams.get("pdfUrl");

  useEffect(() => {
    document.title = "BrainHaven - Resources Viewer";
  }, []);

  if (!pdfUrl) {
    return (
      <p className="text-gray-400 text-center mt-10">
        No PDF available to display.
      </p>
    );
  }

  return (
    <div className="min-h-screen mt-32 px-4">
      <h2 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-6">
        Resource PDF
      </h2>

      <div className="w-full flex justify-center">
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl border border-gray-700"
        />
      </div>
    </div>
  );
};

export default PdfViewer;
