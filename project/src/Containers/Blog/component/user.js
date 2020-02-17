import React from 'react';
import axios from 'axios';
import useAsync from '../async/useAsync';
import Delete from './Delete';
import Update from './Update';

async function getUser(id) {
  const response = await axios.get(
    `http://localhost:8800/api/blogs/${id}`
  );
  return response.data;
}


function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

  
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;
  console.log(user)

  return (
    <div className='bb'>
      <h2>{user.blog.title}</h2> 
      <p>
        <b>contents:</b> {user.blog.contents} 
      </p>
      <Delete id={user.blog.id}/>
      {/* <Update id={user.blog.id} /> */}
    </div>
  );
}

export default User;