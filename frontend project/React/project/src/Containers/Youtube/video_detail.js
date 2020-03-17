import React from 'react';
import '../../Style/style.css'


const VideoDetail = ({ video }) => { //root component = index.js(App)
    if (!video) {
        return <div>loading...</div>
    }
    const videoId = video.id.videoId;


    // const url = 'https://www.youtube.com/embed/' + videoId
    // `` 마크를 이용한 문자열 결합
    const url = `https://www.youtube.com/embed/${videoId}`;


    return (
        <div className='video-detail col-md-8'>
            <div className='embed-responsive embed-responsive-16by9'>
                <iframe className='embed-responsive-item' src={url} />
            </div>
            <div className='details'>
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        
        </div>
    )
};

export default VideoDetail;