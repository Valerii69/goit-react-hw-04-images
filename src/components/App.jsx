import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { AppContainer, Message } from 'App.styled';
import { fetchGalleryImages } from 'services/apiGallery';
import { toast } from 'react-toastify';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setError(false);

    fetchGalleryImages(searchQuery, page)
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
        setGallery(prev => [...prev, ...newItems]);
        setTotalHits(totalHits);
      })

      .catch(error => {
        toast.error(error.message);
        setError(true);
      })

      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setGallery([]);
    setTotalHits(0);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <Message>Please enter a word to start the search</Message>}
      {!error && <ImageGallery gallery={gallery} />}
      {loading && <Loader />}

      {gallery.length < totalHits && <Button onClick={loadMore} />}

      <ToastContainer autoClose={3000} theme="colored" />
    </AppContainer>
  );
}
