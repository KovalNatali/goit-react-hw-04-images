import { Component } from 'react';
import {ModalStyled,Overlay} from './Modal.styled.jsx';

export class Modal extends Component {
  componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
      if (e.code === 'Escape') {
      this.props.onCloseModal();
      }
  };

  handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
      this.props.onCloseModal();
      }
  };

  render() {
    
      return (
      <Overlay onClick={this.handleOverlayClick}>
          <ModalStyled>
          <img  src={this.props.largeImage}
            alt="" onClick={this.props.onClick}  />
          </ModalStyled>
      </Overlay>
      );
  }
};