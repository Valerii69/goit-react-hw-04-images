import React, { Component } from 'react';
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

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };
  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please, enter correct search word!');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };
  //
  render() {
    const { query } = this.state;
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SiCodereview
              style={{ fill: '#3f51b5', height: '25px', width: '25px' }}
            />
          </SearchButton>

          <SearchFormInput
            onChange={this.handleChange}
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
  }
}

export default Searchbar;
