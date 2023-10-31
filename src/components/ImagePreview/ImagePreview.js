import { useEffect, useState } from "react";
import "./imagepreview.css";
function ImagePreview({ imageUrl, title, handleImagePreview }) {
  //   useEffect(() => console.log(imageUrl, title), []);
  return (
    <>
      <div className="image_container">
        <img alt={title} src={imageUrl} className="main_image" />
        <div className="controls">
          <h3 className="image_title">{title}</h3>
          <a
            className="download"
            href={imageUrl}
            download={title}
            target="_blank"
          >
            <img
              alt="download"
              src="https://cdn-icons-png.flaticon.com/128/2989/2989976.png"
            />
          </a>
          <img
            className="backtoalbum"
            src="https://cdn-icons-png.flaticon.com/128/709/709624.png"
            alt="back button"
            onClick={() => handleImagePreview(imageUrl, title)}
          />
        </div>
      </div>
    </>
  );
}

export default ImagePreview;
