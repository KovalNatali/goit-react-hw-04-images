import { ImageGalleryItem } from "./ImageGalleryItem";
import {ImageGalleryList} from "./ImageGalleryStyl.styled"

export const ImageGallery = ({images, onOpenModal}) => {
  return (
<ImageGalleryList>
{images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} selectedImage={onOpenModal} />;
      })}
</ImageGalleryList>
  ) 
  
}

