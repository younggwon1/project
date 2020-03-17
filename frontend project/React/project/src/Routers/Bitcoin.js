import React, { Component } from 'react';
// import './App.css';

import SearchBar from '../Containers/Bitcoin/search_bar'

import BitcoinList from '../Containers/Bitcoin/Bitcoin_list';

export default class Bitcoin extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <BitcoinList />
      </div>
    );
  }
}
