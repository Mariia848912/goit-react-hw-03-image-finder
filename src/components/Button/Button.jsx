import { ButtonLoader } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <ButtonLoader type="button" onClick={onClick}>
    Load more
  </ButtonLoader>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
