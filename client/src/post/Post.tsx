import Card from "react-bootstrap/esm/Card";
import { DeletePost } from "./DeletePost";
import { PostEditHistory } from "./EditHistory";
import { PostDto } from "./post.dto";
import { UpdatePost } from "./Update";

interface Props {
    post: PostDto;
    OnRemove?: () => void; 
}

export function Post(props: Props)
{
    return (
      <Card className="shadow my-3">
        <Card.Header className="d-flex">
          <span className="d-flex align-items-center">{props.post.title}</span>
          <div className="ms-auto d-flex gap-3">
            <DeletePost id={props.post.id} OnRemove={props.OnRemove}/>
            <PostEditHistory id={props.post.id}></PostEditHistory>
            <UpdatePost post={props.post}></UpdatePost>
          </div>
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {props.post.text}
            </Card.Text>
        </Card.Body>
      </Card>
    );
}