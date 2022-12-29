import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import { remove } from "../service/post.service";

interface Props {
    id: string;
    OnRemove?: () => void;
}

export function DeletePost(props: Props)
{
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleOnSubmit()
    {
      if(!props.id) return;

      const result = await remove(props.id);

      if(!result.success)
      {
        alert("Something goes wrong. Please try again");
        return;
      }

      props.OnRemove!();
    }

    function showModal()
    {
      setIsModalOpen(true);
    }

    function handleClose()
    {
      setIsModalOpen(false);
    }


    return (
        <Form onSubmit={handleOnSubmit} className="d-flex">
          <div className="d-grid">
            <Button variant="danger" onClick={showModal}>
              Obrisi
            </Button>
          </div>
          <Modal show={isModalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Brisanje posta</Modal.Title>
          </Modal.Header>
          <Modal.Body>Da li ste sigurni da zelite da obrisete post? Kasnije promene nece biti dostupne</Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Otkazi
              </Button>
              <Button variant="danger" type="submit" onClick={handleOnSubmit}>
              Obrisi
              </Button>
          </Modal.Footer>
          </Modal>
        </Form>
      );
}