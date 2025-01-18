import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";

const UrlViewer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const rawLinks = queryParams.get("videoLinks") || "[]";
  let videoLinks = [];
  try {
    videoLinks = JSON.parse(rawLinks).map((link) => {
      const videoId =
        link.split("v=")[1]?.split("&")[0] || link.split("/").pop();
      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      return embedLink;
    });
  } catch (error) {
    console.error("Invalid videoLinks format:", error);
  }

    useEffect(() => {
      document.title = "BrainHaven - URL Viewer";
    }, []);

  return (
    <>
      <div className="text-white mt-40 my-16">
        <h1 className="bg-gradient-to-tl from-indigo-600 to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl font-extrabold text-center drop-shadow-lg my-10">
          Tutorial Video Links
        </h1>
        <div className="flex flex-col items-center gap-12 sm:gap-10">
          {videoLinks.length > 0 ? (
            videoLinks.map((link, index) => (
              <div
                key={index}
                className="sm:max-w-3xl w-[90%]  rounded-lg overflow-hidden shadow-lg"
              >
                <iframe
                  src={link}
                  title={`Video ${index + 1}`}
                  width="100%"
                  height="415"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg h-[200px] sm:h-[415px]"
                ></iframe>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No video links available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UrlViewer;
