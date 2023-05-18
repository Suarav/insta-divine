import React from "react"
import { Button, Modal } from "react-bootstrap"
const SaveTempletModel = (props) => {
    return (
        <Modal show={props.isModel} onHide={props.isHideModel} className="save-template-model">
            <Modal.Header closeButton className="p-4">
                <Modal.Title>Template name</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0 px-4">
                <div className="fontStyle-section-input">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter templet name" onChange={props.getName} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.isHideModel}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.saveChanges} className>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default SaveTempletModel;