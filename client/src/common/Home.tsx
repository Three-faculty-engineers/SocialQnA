import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import CreateCommunity from "../community/CreateCommunity";
import { CreatePost } from "../post/CreatePost";
import { Post } from "../post/Post";
import { PostDto } from "../post/post.dto";
import { getByFollowers, getTop10 } from "../service/post.service";
import { get, getFollowedCommunities } from "../service/user.service";
import { UserDto } from "../user/user.dto";

interface Props {
  auth: any;
}

export default function Home(props: Props)
{
  const [posts, setPosts] = useState([] as JSX.Element[]);
  const [userAuthInfo, setUserAuthInfo] = useState({} as UserDto);
  const [top10Posts, setTop10Posts] = useState([] as JSX.Element[]);
  const [followedCommunities, setFollowedCommunities] = useState([] as JSX.Element[]);

  useEffect(() => {
    getTop10Posts();
  },[])

  useEffect(() => {
    getPosts();
    getAuthInfo();
    getUserFollowedCommunities();
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

  async function getAuthInfo()
  {
    if(!props.auth.id) return;

    const result = await get(props.auth.id);

    if(!result.success)
    {
      return;
    }

    setUserAuthInfo(result.data);
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

  async function getUserFollowedCommunities()
  {
    if(!props.auth.id) return;

    const result = await getFollowedCommunities(props.auth.id);

    if(!result.success)
    {
      return;
    }

    setFollowedCommunities(result.data.map((community: {id: string, title: string}, index: number) => {
      return (
        <p className="h4" key={index}><a href={`/community/${community.id}`} className="text-dark">{community.title}</a></p>
      );
    }))
  }

  return (
    <Container>
      <Row className="vh-100 my-5">
        <Col md={3} lg={3} xs={12}>
          {!!Object.keys(props.auth).length && (
            <div>
              <h2><a href={`/profile/${userAuthInfo.id}`} className="text-decoration-none text-dark">{userAuthInfo.username}</a></h2>
              <br />
              <h3>Followed Communities:</h3>
              {followedCommunities}
            </div>
          )}
        </Col>

        {!Object.keys(props.auth).length ? (
          <Col md={6} lg={6} xs={12}>
            <h1 className="text-center">Welcome!</h1>
          </Col>
        ) : (
          
        <Col md={6} lg={6} xs={12}>
          <div className="d-flex justify-content-center">
            <CreatePost></CreatePost>
          </div>
          <div className="d-flex justify-content-center">
            <CreateCommunity/>
          </div>
          {!posts.length && (
            <h3 className="text-center">Trenutno nema nijedan post</h3>
          ) || (
            posts
          )}
        </Col>
        )}
        <Col md={3} lg={3} xs={12} className="text-center">
          <h2>Top 10 najcitanijih</h2>
          {top10Posts}
        </Col>
      </Row>
    </Container>
  );
}