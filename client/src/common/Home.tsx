import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { CreatePost } from "../post/CreatePost";

export default function Home()
{

    return (
      <Container>
        <Row className="vh-100 d-flex justify-content-center my-5">
          <Col md={8} lg={6} xs={12}>
            <CreatePost></CreatePost>
          </Col>
        </Row>
      </Container>
    );
}