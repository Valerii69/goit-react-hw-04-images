import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { AppContainer, Message } from 'App.styled';
import { fetchGalleryImages } from 'services/apiGallery';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
    gallery: [],
    page: 1,
    totalHits: 0,
    loading: false,
    error: false,
  };

  componentDidUpdate(_, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.setState({ page: 1, gallery: [], loading: true });
      if (page === 1) {
        this.fetchImages(query, page);
      }
    }
  }

  fetchImages = (query, page) => {
    this.setState({ loading: true });

    fetchGalleryImages(query, page)
      .then(data => {
        const { hits, totalHits } = data;
        if (!hits.length) {
          return toast.warn('Please enter a correct search word!');
        }
        const newItems = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...newItems],
          totalHits,
        }));
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true, totalHits: 0 });
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleFormSubmit = query => {
    this.setState({ query, gallery: [], page: 1, totalHits: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, loading, gallery, totalHits } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <Message>Please enter a word to start the search</Message>}
        {!error && <ImageGallery gallery={gallery} />}
        {loading && <Loader />}

        {gallery.length < totalHits && <Button onClick={this.loadMore} />}

        <ToastContainer autoClose={3000} theme="colored" />
      </AppContainer>
    );
  }
}
