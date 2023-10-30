import {ImageGalleryItemStyled,ImageGalleryItemImage} from './ImageGalleryItem.styled'


export const  ImageGalleryItem = ({ image,selectedImage }) => {
    return (
      <ImageGalleryItemStyled className="gallery-item">
        <ImageGalleryItemImage
         src={image.webformatURL}
          large={image.largeImageURL}
          alt={image.tags}
          onClick={() => selectedImage(image.largeImageURL)}
        />
      </ImageGalleryItemStyled>
    );
  };
