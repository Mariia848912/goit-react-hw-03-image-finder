import { ButtonLoader } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onIncrement }) => (
  <ButtonLoader type="button" onClick={onIncrement}>
    Load more
  </ButtonLoader>
);

Button.propTypes = {
  onIncrement: PropTypes.func.isRequired,
};
