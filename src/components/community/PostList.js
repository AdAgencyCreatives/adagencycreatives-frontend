import { IoEllipsisVertical, IoPencilOutline, IoTimeOutline, IoTrashOutline } from 'react-icons/io5';
import UserAvatar from '../../assets/images/user1.jpg';
import Miami from '../../assets/images/Miami.png';
import { useState } from 'react';

const PostList = () => {

    const [actions,setActions] = useState('none');

    return (
        <div className="postlist">
            <div className="post-item">
                <div className="post-header">
                    <img className='post-avatar' src={UserAvatar} />
                    <div className='post-meta'>
                        <div className='post-username'>
                            Ad Agency Creatives
                        </div>
                        <div className='post-time'>
                            <IoTimeOutline />
                            <span className='time-text'>1 hour ago</span>
                        </div>
                    </div>
                    <div className='post-action'>
                        <div className='action-button'>
                            <IoEllipsisVertical onClick={() => setActions((state) => state == "show" ? "none" : "show")} />
                        </div>
                        <div className={`action-dropdown d-${actions}`}>
                            <ul>
                                <li><IoPencilOutline /> Edit</li>
                                <li><IoTrashOutline /> Delete</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='post-content'>
                    <div className='post-body'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    <img src={Miami} />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PostList;