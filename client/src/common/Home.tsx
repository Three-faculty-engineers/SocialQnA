import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { CreatePost } from "../post/CreatePost";
import { Post } from "../post/Post";
import { PostDto } from "../post/post.dto";
import { getByFollowers, getTop10 } from "../service/post.service";

interface Props {
  auth: any;
}

export default function Home(props: Props)
{
  const [posts, setPosts] = useState([] as JSX.Element[]);
  const [top10Posts, setTop10Posts] = useState([] as JSX.Element[]);

  useEffect(() => {
    getTop10Posts();
  },[])

  useEffect(() => {
    getPosts();
  }, [props.auth]);

  async function getPosts()
  {
    if(!props.auth.id) return;

    const result = await getByFollowers(props.auth.id);

    if(!result.success)
    {
      return;
    }

    setPosts(result.data.map((post: PostDto, index: number) => <Post userID={props.auth.id} post={post} key={index}></Post>))
  }

  async function getTop10Posts()
  {
    const result = await getTop10();

    if(!result.success)
    {
      return;
    }

    setTop10Posts(result.data.map((post: {id: string, title: string}, index: number) => <h3 key={index}><a href={`/post/${post.id}`}>{post.title}</a></h3>))
  }

  if (!Object.keys(props.auth).length) {
    return (
      <Container>
        <Row className="vh-100 d-flex justify-content-center my-5">
          <Col md={8} lg={6} xs={12}>
            <h1>Welcome!</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="vh-100 my-5">
        <Col md={3} lg={3} xs={12}>

        </Col>
        <Col md={6} lg={6} xs={12}>
          <CreatePost></CreatePost>
          {!posts.length && (
            <h3>Trenutno nema nijedan post</h3>
          ) || (
            posts
          )}
        </Col>
        <Col md={3} lg={3} xs={12} className="text-center">
          <h2>Top 10 najcitanijih</h2>
          {top10Posts}
        </Col>
      </Row>
    </Container>
  );
}