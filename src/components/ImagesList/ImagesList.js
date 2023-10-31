import "./imageslist.css";
import { db } from "../../firebaseInit";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import ImagePreview from "../ImagePreview/ImagePreview";

function ImagesList({ albumId, onBackClick }) {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editImageId, setEditImageId] = useState(null);
  const [title, setTitle] = useState("");
  const [imageShow, setImageShow] = useState(false);
  const [preViewUrl, setPreViewUrl] = useState("");
  const [preViewTitle, setPreViewTitle] = useState("");

  // Render the live Data from the database
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "images"), (snapShot) => {
      const images = snapShot.docs
        .filter((doc) => doc.data().albumId === albumId)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(images);
      // console.log("Current data: ", snapShot.data());
    });
    return () => {
      unsub();
    };
  }, [albumId]);

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setEditImageId(null);
  };

  // Add the Image to the database
  const handleAddImage = async () => {
    try {
      if (title !== "" && imageUrl !== "") {
        if (editImageId) {
          // If editImageId is not null, update the existing image
          // updating the doc with id editImageId in the DB
          await setDoc(doc(db, "images", editImageId), {
            albumId,
            title,
            imageUrl,
          });
          toast.success("Image updated successfully!");
        } else {
          // Otherwise, add a new image
          await addDoc(collection(db, "images"), {
            albumId,
            title,
            imageUrl,
          });
          toast.success("Image added successfully!");
        }
        setTitle("");
        setImageUrl("");
        setEditImageId(null);
      } else {
        toast.error("Please Add the fields");
      }
    } catch (error) {
      console.error("Error adding image to Firebase: ", error);
    }
  };
  // Delete the image form the database
  const handleDeleteImage = async (imageId) => {
    try {
      await deleteDoc(doc(db, "images", imageId));
      toast.success("Image Delete successfully!");
    } catch (error) {
      console.error("Error deleting image from Firebase: ", error);
    }
  };

  // Edit the image in database
  const handleEditImage = (image) => {
    setTitle(image.title);
    setImageUrl(image.imageUrl);
    setEditImageId(image.id);
    setShowForm(true);
  };
  const handleImagePreview = (imageUrl, title) => {
    // console.log(imageUrl, title);
    setImageShow(!imageShow);
    setPreViewUrl(imageUrl);
    setPreViewTitle(title);
  };

  return (
    <>
      <div className="imageslistmain">
        {/* Add Image form */}
        {showForm && (
          <div className="imageslistform">
            <h1>{editImageId ? "Edit Image" : "Add Image to Album"}</h1>
            <input
              type="text"
              className="title"
              placeholder="Title"
              required
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="imgurl"
              placeholder="Imgage URL"
              required
            />
            <div className="imageslistbtn">
              <button
                className="clear"
                onClick={() => {
                  setTitle("");
                  setImageUrl("");
                  setEditImageId("");
                }}
              >
                Clear
              </button>
              {/* submit button */}
              <button className="add" onClick={handleAddImage}>
                {editImageId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        )}

        {/* Header Part */}

        <div className="top">
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
            className="back"
            onClick={onBackClick}
          />
          <h1>
            {images.length === 0 ? `No Images in the Album` : `Images in Album`}
          </h1>
          <button className="addingimg" onClick={handleToggleForm}>
            {showForm ? "Cancel" : "Add Image"}
          </button>
        </div>

        {/* Images container */}
        <div className="showimg">
          {images.map((image, index) => (
            <div className="bottom">
              <div key={image.id} className="card">
                {/* Edit buttons */}
                <div className="hover">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3838/3838833.png"
                    alt="edit"
                    className="edit"
                    onClick={() => handleEditImage(image)}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/8102/8102162.png"
                    alt="delete"
                    className="delete"
                    onClick={() => handleDeleteImage(image.id)}
                  />
                </div>
                {/* Main Image */}
                <img
                  src={image.imageUrl}
                  alt="album img"
                  className="bottomimg"
                  onClick={() =>
                    handleImagePreview(image.imageUrl, image.title)
                  }
                />
                <h3>{image.title}</h3>
                {/* Main Image */}
              </div>
            </div>
          ))}
        </div>
        {imageShow && (
          <ImagePreview
            handleImagePreview={handleImagePreview}
            imageUrl={preViewUrl}
            title={preViewTitle}
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={500}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default ImagesList;
