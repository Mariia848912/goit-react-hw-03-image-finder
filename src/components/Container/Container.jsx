import PropTypes from 'prop-types';
import { Box } from "./Container.styled";

export const Container = ({ children }) => (
    <Box>{children}</Box>
)

Container.propTypes = {
    children: PropTypes.node.isRequired
}