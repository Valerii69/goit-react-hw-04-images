import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeydownCloseModal = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydownCloseModal);

    return () => {
      window.removeEventListener('keydown', handleKeydownCloseModal);
    };
  }, [onClose]);

  const handleOverlayCloseModal = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayCloseModal}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
