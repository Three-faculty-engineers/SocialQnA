import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

export default function Home()
{

    return (
      <Container>
        <Row className="vh-100 d-flex justify-content-center">
          <Col md={8} lg={6} xs={12}>
            <h1 className="text-center">Hello!</h1>
          </Col>
        </Row>
      </Container>
    );
}