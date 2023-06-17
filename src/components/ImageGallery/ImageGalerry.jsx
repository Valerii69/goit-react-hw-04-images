import ImageGalleryItem from 'components/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';
// import { fetchGalleryImages } from 'services/apiGallery';

const ImageGallery = ({ gallery }) => {
  return (
    <Gallery>
      {gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          tags={tags}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
