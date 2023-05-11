import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ pictures, onClickImg }) => {
  const handleChooseImg = e => {
    onClickImg(e.currentTarget.src);
  };
  return (
    <>
      {pictures.map(({ id, webformatURL, tags }) => (
        <GalleryItem key={id}>
          <Image src={webformatURL} alt={tags} onClick={handleChooseImg} />
        </GalleryItem>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClickImg: PropTypes.func.isRequired,
  picture: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    })
  ),
};
