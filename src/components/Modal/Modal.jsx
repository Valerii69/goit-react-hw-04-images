import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  //монтування з слухачем подій модалки
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownCloseModal);
  }
  //розмонтування  з слухачем подій модалки
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownCloseModal);
  }
  //закрити модальне вікно
  handleOverlayCloseModal = evt => {
    const { onClose } = this.props;
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
  //закрити модальне вікно "Escape"
  handleKeydownCloseModal = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayCloseModal}>
        <ModalContainer>{this.props.children}</ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
