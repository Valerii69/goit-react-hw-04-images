import Modal from 'components/Modal';
import { useState } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { memo } from 'react';

function ImageGalleryItem({ id, webformatURL, largeImageURL, tags }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <GalleryItem>
      <GalleryItemImage
        onClick={() => setShowModal(true)}
        id={id}
        src={webformatURL}
        alt={tags}
        large={largeImageURL}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default memo(ImageGalleryItem);
// export default ImageGalleryItem;
