import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmDeleteModal({ show, onHide, TBD }) {




    return (
        <Modal
            className="updateInfo text-white"
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row d-flex justify-content-center">
                    <h4 className="">Are you sure you want to remove this game from favorites?</h4>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onHide}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}