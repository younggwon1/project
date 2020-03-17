import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBLOG } from '../../Actions/Blog'
// import Chart from '../components/chart';



class BlogList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchBLOG();
  }

  renderblog(data) {
    console.log(">>>", data);
    // const id =Data.id;
    // const category = Data.map(blog => blog.category);
    // const title = Data.map(blog => blog.title);
    // const author = Data.map(blog => blog.author);
    // const contents = Data.map(blog => blog.contents);

    return (
      <tr key ={data.id}>
        <td>{data.category}</td>
        <td>{data.title}</td>
        <td>{data.author}</td>
        <td>{data.contents}</td>
      </tr>
    )
  }
  render() {
    // console.log(">>>",this.props)
    if(this.props.blog === []){
      return(
        <div>loading...</div>
      )
    }
    
    return (

      <table className='table'>
       
        <tbody>
        <tr>
          <th>category</th>
          <th>title</th>
          <th>author</th>
          <th>contents</th>
       
        </tr>
          {this.props.blog.map(this.renderblog)}
        </tbody>
        
      </table>
      
    );
  }
}
// mapSrtateToProps funciton
function mapStateToProps(state) {
  return { blog: state.blog };
}

// mapDispatchToProps function
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchBLOG},dispatch);
}

// connect mapping
export default connect(mapStateToProps, mapDispatchToProps)(BlogList);