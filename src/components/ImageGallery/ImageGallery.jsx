import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, onShowModal }) => {
  return (
    <Gallery>
      {pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onShowModal={onShowModal}
        />
      ))}
    </Gallery>
  );
};
ImageGallery.propTypes = {
  onShowModal: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
