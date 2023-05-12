import { Component } from 'react';
import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPictures } from '../services/pixabay-api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ErrorText } from './ErrorText/ErrorText';

const notification = {
  error: 'Whoops, something went wrong',
  noInfoInTheGallery:
    'Sorry, there are no images matching your search query. Please try again.',
  noInfoToSearch: 'Enter data to search for pictures',
};
export class App extends Component {
  state = {
    pictures: [],
    searchQuery: '',
    page: 1,
    totalHits: null,
    isloading: false,
    showModal: false,
    selectedPicture: null,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isloading: true });
      this.fetchPictures(searchQuery, page);
    }
  }

  fetchPictures = async (searchQuery, page) => {
    try {
      this.setState({ isloading: true });
      const info = await getPictures(searchQuery, page);

      if (info.hits.length === 0) {
        return toast.error(notification.noInfoInTheGallery);
      }
      
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...info.hits],
        totalHits: info.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isloading: false });
    }
  };
  handleFormSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      toast.error(notification.noInfoToSearch);
      return;
    }
    this.setState({ searchQuery, page: 1, pictures: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onShowModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      selectedPicture: { largeImageURL, tags },
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      selectedPicture: null,
    });
  };

  render() {
    const {
      pictures,
      isloading,
      showModal,
      selectedPicture,
      totalHits,
      error,
    } = this.state;
    const checkEndList = totalHits / pictures.length;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {pictures.length > 0 && (
          <ImageGallery pictures={pictures} onShowModal={this.onShowModal} />
        )}
        {pictures.length > 0 && !isloading && checkEndList > 1 && (
          <Button onClick={this.onLoadMore} />
        )}
        {isloading && <Loader />}
        {showModal && (
          <Modal
            largeImageURL={selectedPicture.largeImageURL}
            alt={selectedPicture.tags}
            onClose={this.onCloseModal}
          />
        )}
        {error && <ErrorText/>}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
