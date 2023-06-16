import axios from 'axios';
import PropTypes from 'prop-types';

// `https://pixabay.com/api/?q=${query}&page=${page}&key=31431099-cb6424a99d97f67db3bc0cdc7&image_type=photo&orientation=horizontal&per_page=12`
const baseURL = 'https://pixabay.com/api/';

export async function fetchGalleryImages(query, page) {
  const PARAMS = new URLSearchParams({
    q: `${query}`,
    page: `${page}`,
    key: '31107721-7ee60bad5b686af5fdf0a833c',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  const API = baseURL + '?' + PARAMS;
  const response = await axios.get(API);
  return response.data;
}
fetchGalleryImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
