import React, { useEffect } from 'react'
import TableData from './TableData'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../store/slices/postsSlice';


function Posts() {
  let content;
  const status = useSelector((state) => state.posts.status)
  const posts = useSelector((state) => state.posts.posts)
  const error = useSelector((state) => state.posts.error)
  const dispatch = useDispatch()

  if (status === "loading") {
    content = <div className="text-center my-5">Loading...</div>
  } else if (status === "succeeded") {
    // change the order of the posts
    const orderedPosts = posts.slice().sort((a, b) => a - b)

    content = orderedPosts.map((post, i) => (
      <TableData key={i} post={post} />
    ))
  } else if (status === "failed") {
    content = (
      <>
        <h1>Posts not found</h1>
        <p className='text-center text-danger'>{error}</p>
      </>
    )
  }

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3>Here are all the posts</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {content}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Posts