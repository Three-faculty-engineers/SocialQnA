import Card from "react-bootstrap/esm/Card";
import { PostDto } from "./post.dto";

interface Props {
    post: PostDto;
}

export function Post(props: Props)
{
    return (
      <Card className="shadow my-3">
        <Card.Header>{props.post.title}</Card.Header>
        <Card.Body>
            <Card.Text>
                {props.post.text}
            </Card.Text>
        </Card.Body>
      </Card>
    );
}