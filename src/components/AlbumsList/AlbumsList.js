import "./albumslist.css";
import { db } from "../../firebaseInit";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImagesList from "../ImagesList/ImagesList";

import { useEffect, useState } from "react";

import { getDocs, addDoc, collection } from "firebase/firestore";

function AlbumList() {
  const [showForm, setShowForm] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [albums, setAlbums] = useState([]);

  //setting this to identify if we are inside of a album or not
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    document.title = "PhotoFolio | Vipul";
    fetchAlbums();
  }, []);

  // fetch the albums from the DB
  const fetchAlbums = async () => {
    const querySnapshot = await getDocs(collection(db, "albums"));
    const albumsData = [];
    querySnapshot.forEach((doc) => {
      albumsData.push({ id: doc.id, name: doc.data().name });
    });
    setAlbums(albumsData);
  };

  //Create the album in DB
  const handleAlbumCreate = async (name) => {
    try {
      // Add a new document without generated id.
      await addDoc(collection(db, "albums"), {
        name: name,
      });
      setAlbumName(name);
      fetchAlbums();
    } catch (error) {
      console.error("Error creating album: ", error);
    }
  };

  //Toggle visibility of form
  const handleAddAlbum = () => {
    // setShowForm((prevShowForm) => !prevShowForm);
    setShowForm(!showForm);
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId(albumId);
    console.log(selectedAlbumId);
    setShowForm(false);
  };

  const handleBackClick = () => {
    setSelectedAlbumId(null);
  };
  return (
    <>
      {showForm && <AlbumForm onAlbumCreate={handleAlbumCreate} />}
      {/* Managing the button */}
      {!selectedAlbumId && (
        <div className="albumslistmain">
          <h2 className="text">Your Albums</h2>
          <button className="addbtn" onClick={handleAddAlbum}>
            {showForm ? "Cancel" : "Add Album"}
          </button>
        </div>
      )}

      {!selectedAlbumId && albums.length > 0 && (
        <div className="grid">
          {albums.map((album) => (
            <div
              className="container"
              key={album.id}
              onClick={() => handleAlbumClick(album.id)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2659/2659360.png"
                alt="album"
              />
              <span>{album.name}</span>
            </div>
          ))}
        </div>
      )}

      {selectedAlbumId && (
        <ImagesList albumId={selectedAlbumId} onBackClick={handleBackClick} />
      )}
    </>
  );
}

export default AlbumList;
