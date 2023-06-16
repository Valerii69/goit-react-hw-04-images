import { LoaderContainer } from './Loader.styled';
import { Blocks } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderContainer>
      <Blocks
        visible={true}
        height="250"
        width="250"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </LoaderContainer>
  );
};
export default Loader;
