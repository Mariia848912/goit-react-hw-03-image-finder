import { Spinner } from './Loader.styled';
import { ThreeCircles } from 'react-loader-spinner';

export const Loader = () => (
  <Spinner>
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  </Spinner>
);
