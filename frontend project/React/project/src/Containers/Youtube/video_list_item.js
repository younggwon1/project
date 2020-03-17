import React from 'react';
import '../../Style/style.css'

const VideoListItem = ({ video, onVideoSelect }) => {
    // {video, onVideoSelect} : 부모 component에서 설정한 이름을 비구조 할당({})으로 가져오면 props를 쓰지 않고 사용할 수 있다. 
    const imageUrl = video.snippet.thumbnails.default.url;
    // console.log(imageUrl)

    return (
        <li onClick={() => onVideoSelect(video)} className='list-group-item'>

            <div className='video-list media'>
                <div className='media-left'>
                    <img className='video-item img' src={imageUrl} />
                </div>
                <div className='media-body'>
                    <div className='media-heading'>
                        {video.snippet.title}
                    </div>
                </div>
            </div>

            {video.snippet.title}
        </li>

    )
};

export default VideoListItem;