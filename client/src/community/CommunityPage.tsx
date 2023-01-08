import React, {useState, useEffect} from 'react'
import { get } from '../service/community.service'
import { useParams, useNavigate } from 'react-router-dom';
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { CommunityDto } from './community.dto';
import Community from './Community';
import { CreatePost } from '../post/CreatePost';
interface Props {
    auth: any;
}

function CommunityPage(props: Props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [community, setCommunity] = useState({} as CommunityDto);
    

    async function getCommunity()
    {
        if (!id) return;

        const data = await get(id!);

        if(!data.success)
        {
            return navigate("/error404");
        }

        setCommunity(data.data);
    }

    useEffect(() => {
        getCommunity();

    }, [])

    return (
        <Container>

        <Row className="vh-100 mt-5">
          <Col md={3} lg={3} xs={12}>
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Community community={community} auth={props.auth}/>
          </Col>
          <Col md={3} lg={3} xs={12}>
          </Col>
        </Row>
        <Row>
        <div className="d-flex justify-content-center">
            <CreatePost></CreatePost>
          </div>
        </Row>
      </Container>
    )
}

export default CommunityPage