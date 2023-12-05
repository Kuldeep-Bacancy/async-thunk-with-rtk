import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/slices/postsSlice';

function TableData({post}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      // dispatch action to store
      dispatch(deletePost(post.id))
    } catch (error) {
      console.log(`Failed to delete the post ${error}`)
    }
  }

  return (
    <div className="item">
      <div>
        <h3>{post.title}</h3>
        <p className="postCredit">
          {post.body}
        </p>
      </div>
      <div>
        <button className="btn btn-danger" onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  )
}

export default TableData