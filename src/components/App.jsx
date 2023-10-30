import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from "./Searchbar/Searchbar";
import {ButtonLoad } from "./ButtonLoad/ButtonLoad";
import { fetchImage } from "./Api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";



export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [isModal, setIsModal] = useState(false);

 const handalSubmit = evt => {
    evt.preventDefault();
    setQuery(`${Date.now()}/${evt.target.elements.query.value}`);
      setImages([]);
      setPage(1); 
    };

 const handalLoadMore = () => {
  setPage(prevPage => (prevPage + 1))
    };

 const onOpenModal = imageURL => {
     
      setIsModal(true);
      setSelectedImage(imageURL);
    };
  
   const onCloseModal = () => {

      setIsModal(false);
      setSelectedImage('')
    };

    useEffect (() => {
      if (!query) {
        return;
      }
       async function fetchData () {
        try {
          setLoading(true);
          setError(false);
          const images = await fetchImage(query.split('/')[1],page);

          if (images.hits.length === 0) {
           toast.error('Nothing was found for your image request');
          }
        setImages(prevImage => [...prevImage, ...images.hits]);
        setTotalHits(images.totalHits);
      
    } catch (error) {
          toast.error('Oops! Try to reload the page.');
          setError(true);
        } finally {
          setLoading(false)
        }
      
    }
    fetchData();
    },[query,page] )

 return (
    <div className="gallary">
     <SearchBar onSubmit = {handalSubmit} />
     {loading && <Loader />}
     {!error && (
        <>
     <ImageGallery
          images={images}
          onOpenModal={onOpenModal}
        />
           </>
      )}
     {page < Math.ceil(totalHits / 12) ? (
    <ButtonLoad onClick = {handalLoadMore}/>
        ) : null}
          {isModal && (
          <Modal
          largeImage={selectedImage}
          onClick={onCloseModal}
          onCloseModal={onCloseModal}
          />
        )}
       <Toaster position="top-right"/>
     </div>
  );
  
 
};
