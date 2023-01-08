import React, { useState, useEffect } from 'react'
import { PostDto } from '../post/post.dto';
import { getByCommunityID } from '../service/post.service';
import { CommunityDto } from './community.dto';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Post } from '../post/Post';

interface Props {
    auth: any;
    community: CommunityDto;
}

function Community(props: Props) {

    const [posts, setPosts] = useState([] as PostDto[]);


    async function getPosts()
    {
        const data = await getByCommunityID(props.community.id!);

        if(!data.success)
        {
            return;
        }
        setPosts(data.data);

    }

    useEffect(() => {
        
        getPosts();
    }, [props.community])

    const postsElements: JSX.Element[] = [];
    posts.forEach((post, index) => postsElements.push(<Post post={post} key={index} userID={props.auth.id}></Post>));

    return (
        <Container>
        <Row>        
            <h1>{props.community.title}</h1>
            <h2>{props.community.description}</h2>
        </Row>
        <Row className="vh-100 mt-5">
        <Col md={1} lg={1} xs={12}>
        </Col>
        <Col md={10} lg={10} xs={12}>
            {posts.length ? postsElements : (
                <h5>Community je prazan</h5>
            )}
        </Col>
        <Col md={1} lg={1} xs={12}>
        </Col>
        </Row>
    </Container>
    )
}

export default Community