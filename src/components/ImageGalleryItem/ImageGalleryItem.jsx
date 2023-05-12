import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, tags, largeImageURL, onShowModal }) => {

  return (
    <GalleryItem>
      <Image src={src} alt={tags} onClick={() => onShowModal(largeImageURL, tags)} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onShowModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
