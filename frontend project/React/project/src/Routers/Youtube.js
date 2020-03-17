import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from '../Containers/Youtube/search_bar';
import VideoList from '../Containers/Youtube/video_list';
import VideoDetail from '../Containers/Youtube/video_detail';
// import _ from 'lodash'

const API_KEY = 'AIzaSyAGBGeWwYqkg9d21m9cmwFubxoOjTVDNGI';

export default class Youtube extends Component {
  constructor(props) {
    super(props); // 부모의 생성자 함수를 호출

    this.state = {
      videos: [],
      selectedVideo: null
      
    }

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }

  handleSelect = (selectedVideo) => {
    this.setState({
      selectedVideo: selectedVideo
      // 선택한 video가 video detail 에 나타나게 하는 함수
    })
  }


  render() {
    // const _videoSearch = _.debounce((term) => {
    //   this.videoSearch(term)
    // }, 300);

    const _videoSearch = (term) => {
        console.log(term)
        this.videoSearch(term)
    }
    
    return (
      <div>
        <SearchBar onSearchTermChange={_videoSearch} />
        <VideoDetail
          video={this.state.selectedVideo} />
        <VideoList
          // onVideoSelect={this.handleSelect}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    )
  }
}
// ReactDom.render(<App />, document.querySelector('.container'));





