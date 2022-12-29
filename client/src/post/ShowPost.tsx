import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import { get, visitPost } from "../service/post.service";
import { Post } from "./Post";
import { PostDto } from "./post.dto";

export function ShowPost()
{
    const navigate = useNavigate();
    const [post, setPost] = useState({title: "", text: ""} as PostDto);
    const { id } = useParams();

    async function getPost()
    {
        if (!id) return;
        const data = await get(id);

        if(!data.success)
        {
            return navigate("/error404");
        }

        setPost(data.data);

        await visitPost(id);
    }

    function handleOnRemove()
    {
        navigate("/");
    }

    useEffect(()=> {
        getPost();
    }, [])

    return (
        <Container>
        <Row className="vh-100 mt-5">
          <Col md={3} lg={3} xs={12}>
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Post post={post} OnRemove={handleOnRemove}></Post>
          </Col>
          <Col md={3} lg={3} xs={12}>
          </Col>
        </Row>
      </Container>
    );
}