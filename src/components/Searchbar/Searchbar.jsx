import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiCodereview } from 'react-icons/si';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    // const { query } = this.state;
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please, enter correct search word!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  //
  // const { query } = this.state;
  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SiCodereview
            style={{ fill: '#3f51b5', height: '25px', width: '25px' }}
          />
        </SearchButton>

        <SearchFormInput
          onChange={handleChange}
          className="input"
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
