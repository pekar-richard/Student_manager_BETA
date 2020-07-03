import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { Button } from "reactstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Example({ deleteitem, modalheading, message }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <li className="list-group-item delete" onClick={handleShow}>
        <i className="fa fa-minus-circle pr-1"> Löschen</i>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button variant="primary" onClick={(handleClose, deleteitem)}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { Example };
