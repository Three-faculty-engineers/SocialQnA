import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import { create } from "../service/post.service";
import { PostDto } from "./post.dto";

interface Props {
    OnCreate?: () => void;
}

export function CreatePost(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [post, setPost] = useState({title: "", text: ""});
    const [communities, setCommunities] = useState([]);

    async function handleOnSubmit()
    {
        
      const result = await create(post as PostDto);

      if(!result.success)
      {
        alert("Something goes wrong. Please try again");
        return;
      }

      if(props.OnCreate)
      {
        props.OnCreate();
      }
    }

    function showModal()
    {
      setIsModalOpen(true);
    }

    function handleClose()
    {
      setIsModalOpen(false);
    }

    function handleOnChange(e: any)
    {
        const {name, value} = e.target;

        setPost({
            ...post,
            [name]: value
        })
    }
    
    return(
        <Form onSubmit={handleOnSubmit} className="d-flex">
          <div className="d-grid">
            <Button variant="info" onClick={showModal} className="rounded-circle px-4 py-2">
              <span className="h1 text-light">+</span>
            </Button>
          </div>
          <Modal show={isModalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Dodaj post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="formTitle">
                <Form.Select>
                    <option>Community</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Label className="text-center">
                    Title
                </Form.Label>
                <Form.Control
                type="text"
                placeholder="Unesite naslov"
                value={post.title}
                name="title"
                onChange={handleOnChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label className="text-center">
                    Text
                </Form.Label>
                <Form.Control
                as="textarea"
                type="text"
                placeholder="Unesite text"
                value={post.text}
                name="text"
                onChange={handleOnChange}
                />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Otkazi
              </Button>
              <Button variant="success" type="submit" onClick={handleOnSubmit}>
              Dodaj
              </Button>
          </Modal.Footer>
          </Modal>
        </Form>
    );
}