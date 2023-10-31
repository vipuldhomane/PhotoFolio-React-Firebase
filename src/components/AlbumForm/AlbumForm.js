import { useState } from "react";
import "./albumform.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlbumForm({ onAlbumCreate }) {
  const [albumName, setAlbumName] = useState("");

  // create the album
  function handleCreateAlbum() {
    //if name is empty
    if (albumName.trim() === "") {
      toast.error("Please Enter an Album Name");
    } else {
      // create the album
      onAlbumCreate(albumName);
      toast.success("Album Created Successfully");
      // set back to the empty field
      setAlbumName("");
    }
  }

  //Handle clear
  function handleClear() {
    setAlbumName("");
  }

  //Handle the input change
  function handleInputChange(e) {
    setAlbumName(e.target.value);
  }

  return (
    <>
      <div className="form">
        <h1>Create an Album </h1>
        <div className="input">
          <input
            type="text"
            placeholder="Album Name"
            value={albumName}
            onChange={handleInputChange}
            autoFocus
          />
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
          <button className="create" onClick={handleCreateAlbum}>
            Create
          </button>
        </div>
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

export default AlbumForm;
