import Card from "react-bootstrap/esm/Card";
import { DeletePost } from "./DeletePost";
import { PostEditHistory } from "./EditHistory";
import { PostDto } from "./post.dto";
import { UpdatePost } from "./Update";

interface Props {
    post: PostDto;
    userID: string;
    OnRemove?: () => void; 
}

export function Post(props: Props)
{
    return (
      <Card className="shadow my-3">
        <Card.Header className="d-flex">
          <span className="d-flex align-items-center"><a href={`/post/${props.post.id}`} className="text-decoration-none text-dark">{props.post.title}</a></span>
          <div className="ms-auto d-flex gap-3">
            {props.post.user!.id === props.userID && (
              <div className="d-flex gap-3">
                <DeletePost id={props.post.id} OnRemove={props.OnRemove}/>
                <UpdatePost post={{id: props.post.id, title: props.post.title, text: props.post.text}}></UpdatePost>
              </div>
            )}
            <PostEditHistory id={props.post.id}></PostEditHistory>
          </div>
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {props.post.text}
            </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex gap-3">
            <span className="h4 text-success"><i className="fa fa-thumbs-up"></i>{props.post.likes}</span>
            <span className="h4 text-danger"><i className="fa fa-thumbs-down"></i>{props.post.dislikes}</span>
          </div>
        </Card.Footer>
      </Card>
    );
}