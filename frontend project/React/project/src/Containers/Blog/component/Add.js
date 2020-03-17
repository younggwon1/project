import React, { Component } from 'react';
import axios from 'axios';
import useAsync from '../async/useAsync';


class Add extends Component {
    constructor(props){
        super(props);
        this.state ={
            id: "",
            category: "",
            title: "",
            author: "",
            contents: "",
            link: "",
            is_private: "",
            cdate: ""
        }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)    

    this.handleValueChange = this.handleValueChange.bind(this)

    this.addCustomer = this.addCustomer.bind(this)
    }     
    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
        console.log(response.data);
        })
        this.setState({
            category: "",
            title: "",
            author: "",
            contents: "",
            link: "",
        });
        window.location.reload();
        
        
        
    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
       
    }

    addCustomer(){
        const url = 'http://localhost:8800/api/blogs/';
        const formData = new FormData();
        
        formData.append('category',this.state.category)
        formData.append('title',this.state.title)
        formData.append('author',this.state.author)
        formData.append('contents',this.state.contents)
        formData.append('link',this.state.link)
        
        console.log(formData)
        // const config = {
        //     headers: {
        //     'content-type': 'multipart/form-data'
        //     }
        // }   
        return axios.post(url, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
            
        })
        

    }    

    render() {
        return (
            
            <form onSubmit={this.handleFormSubmit} className='form-inline aa'>
            
            <div className='form-group '>
            <input type="text" placeholder='category' name="category" value={this.state.category} onChange={this.handleValueChange} /><br/>
            </div>  <div className='form-group'>
            <input type="text" placeholder='title' name="title" value={this.state.title} onChange={this.handleValueChange} /><br/>
            </div>  <div className='form-group'>
            <input type="text" placeholder='author' name="author" value={this.state.author} onChange={this.handleValueChange} /><br/>
            </div>  <div className='form-group'>
            <input type="text" placeholder='contents' name="contents" value={this.state.contents} onChange={this.handleValueChange} /><br/>
            </div>  <div className='form-group'>
            <input type="text" placeholder='link' name="link" value={this.state.link} onChange={this.handleValueChange} /><br/>
            </div>  <div className='form-group'>
            <button type="submit" className='btn btn-primary'>추가하기</button>
            </div>
            </form>
        );
    }
}

export default Add;