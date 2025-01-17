import { useLocation } from "react-router-dom";

const PdfViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pdfUrls = JSON.parse(searchParams.get("pdfUrls") || "[]");

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
        <div className="flex flex-col items-center gap-5">
          {pdfUrls.map((url, index) => (
            <div key={index} className="w-full max-w-4xl">
              <img
                src={url}
                title={`Resource PDF - Page ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
