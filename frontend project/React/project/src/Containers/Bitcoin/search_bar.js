import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchBITCOIN } from '../../Actions/Bitcoin';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state={term: ''}
    this.onInputChange=this.onInputChange.bind(this);
    this.onFormSubmit=this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
      this.setState({
        term: event.target.value
      })

  }

  onFormSubmit(event) {
      event.preventDefault()
      this.props.fetchBITCOIN(this.state.term);
      this.setState({term:''})
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder ="Search" 
          className="form-control"
          value = {this.state.term}
          onChange={this.onInputChange}
          />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}

// mapDispatchToProps function
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchBITCOIN},dispatch);
}

// connect mapping
export default connect(null,mapDispatchToProps)(SearchBar);