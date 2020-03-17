import React, { Component } from 'react';
import axios from 'axios';
import Update from './Update'



class Delete extends Component {
    state = {
        editable : false
    }
    
    delete = (e) => {
        const id = this.props.id
        console.log(id)
        const url = `http://localhost:8800/api/blogs/${id}`
        e.preventDefault()
        axios.delete(url).then(res => console.log(res.data))
        window.location.reload();
    }
    change = (e)=>{
        const {editable} = this.state;
        this.setState({
            editable : !editable
        });
    }
    render() {
        const {editable} = this.state
        if(editable){
            return(
            <Update id={this.props.id}/>
            );
        }
        return (
            <div>
            <button className='btn btn-primary'onClick={this.delete}>삭제</button>  <button className='btn btn-primary' onClick={this.change}>수정</button>
            </div>
        );
    }
}

export default Delete;