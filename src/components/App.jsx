import { Component } from 'react';
import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchPictures } from '../services/pixabay-api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

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
    status: 'idle',
    loading: false,
    showModal: false,
    selectedPictures: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ loading: true, pictures: [] });

      try {
        await fetchPictures(this.state.searchQuery, this.state.page).then(
          pictures => {
            if (pictures.hits.length !== 0) {
              return this.setState({
                pictures: pictures.hits,
                totalHits: pictures.totalHits,
              });
            }
            return toast.error(notification.noInfoInTheGallery);
          }
        );
      } catch (error) {
        toast.error(notification.error);
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }

    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });
      try {
        // console.log("до фетч");
        await fetchPictures(this.state.searchQuery, this.state.page).then(
          pictures => {
            if (
              pictures.hits.length !== 0 &&
              prevState.page !== this.state.page
            ) {
              return this.setState(prevState => ({
                pictures: [...prevState.pictures, ...pictures.hits],
              }));
            }

            return toast.error(notification.noInfoInTheGallery);
          }
        );
      } catch (error) {
        toast.error(notification.error);
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  handleFormSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      toast.error(notification.noInfoToSearch);
      return;
    }
    this.setState({ searchQuery });
  };
  choosePicture = srs => {
    const founPicture = this.searchPicture(srs);
    this.setState({ selectedPictures: founPicture });
    this.toggleModal();
  };
  searchPicture = srs => {
    const { pictures } = this.state;
    const foundPicture = pictures.find(picture => picture.webformatURL === srs);
    return foundPicture;
  };
  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    return this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('ul')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  render() {
    const { pictures, loading, showModal, selectedPictures, totalHits, page } =
      this.state;
    const checkEndList = page * 12;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
        {pictures.length > 0 ? (
          <ImageGallery>
            <ImageGalleryItem
              pictures={pictures}
              onClickImg={this.choosePicture}
            />
          </ImageGallery>
        ) : null}
        {pictures.length > 0 && !loading && checkEndList < totalHits && (
          <Button onIncrement={this.incrementPage} />
        )}
        {loading ? <Loader /> : null}
        {showModal && (
          <Modal
            largeImageURL={selectedPictures.largeImageURL}
            alt={selectedPictures.tags}
            onClose={this.toggleModal}
          ></Modal>
        )}
      </Container>
    );
  }
}
