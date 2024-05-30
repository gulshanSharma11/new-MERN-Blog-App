import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
// Link component allow users to navigate to the blog post component page
import { Link } from 'react-router-dom'

// utility function to format the creation date
import formatDate from '../lib/formatDate'
import http from '../lib/http'

const Home = () => {
  // useState allows us to make use of the component state to store the posts
  const [posts, setPosts] = useState([])
  useEffect(() => {
    // Call the server to fetch the posts and store them into the state
    async function fetchData() {
      const { data } = await http.get('/api/posts')
      setPosts(data.data.posts)
    }
    fetchData()
  }, [])

  return (
    <>
      <Container className="my-5" style={{ maxWidth: '800px' }}>
        <Image
          src="avatar.jpeg"
          width="150"
          style={{ borderRadius: '50%' }}
          className="d-block img-fluid mx-auto"
        />
        <h2 className="text-center">Welcome to the Digital Marketing blog</h2>
      </Container>
      <Container style={{ maxWidth: '800px' }}>
        <ListGroup variant="flush" as="ol">
          {posts.map((post) => {
            // Map the posts to JSX
            return (
              <ListGroup.Item key={post._id}>
                <div className="fw-bold h3">
                  <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </div>
                <div>
                  {post.author} - <span className="text-secondary">{formatDate(post.createdAt)}</span>
                </div>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Container>
    </>
  )
}

export default Home