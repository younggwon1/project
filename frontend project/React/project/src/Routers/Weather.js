import React, { Component } from 'react';

import SearchBar from '../Containers/Weather/search_bar';
import WeatherList from '../Containers/Weather/weather_list';

export default class Weather extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}
