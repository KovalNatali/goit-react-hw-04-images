
import {ModalStyled,Overlay} from './Modal.styled.jsx';
import { useEffect } from 'react';

export function Modal ({largeImage,onClick,onCloseModal}) {
    
useEffect(() => {
const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
          onCloseModal()
      }
    
  };

      window.addEventListener('keydown', handleKeyDown);

 return() => {
      window.removeEventListener('keydown', handleKeyDown);
 };
  },[onCloseModal])

 

 const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
          onCloseModal();
      }
     
  };


    
      return (
      <Overlay onClick={handleOverlayClick}>
          <ModalStyled>
          <img  src={largeImage}
            alt="" onClick={onClick}  />
          </ModalStyled>
      </Overlay>
      );
  
}