import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => <Gallery>{children}</Gallery>;

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
