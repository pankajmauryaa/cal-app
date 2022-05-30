import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Input, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label,} from "@momentum-ui/react";

export default class EventModal extends React.PureComponent {
  state = { showModal: false };
  render() {
    return (
      <div className="row">
        <Button
          children="Create Event"
          onClick={() => this.setState({ showModal: true })}
          color="blue"
        />
        <Modal
          onHide={() => this.setState({ showModal: false })}
          show={this.state.showModal}
          ref={(modal1) => (this.modal1 = modal1)}
          htmlId="modal1"
          backdropClickExit
        >
          <ModalHeader headerLabel="Create Event" showCloseButton />
          <ModalBody>
            <div className="container">
              <Label>Title</Label>
              <div className="flex-container">
                <Input />
              </div>
            </div>
            <div className="container">
              <Label>Start Date</Label>
              <div className="flex-container">
                <Datetime />
              </div>
            </div>
            <div className="container">
              <Label>End Date</Label>
              <div className="flex-container">
                <Datetime />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              children="Close"
              onClick={() => this.modal1.closeModal()}
              ariaLabel="Close Modal"
              color="default"
            />
            <Button
              children="Create"
              type="submit"
              onClick={() => this.props.handleAddEvent()}
              ariaLabel="Submit Form"
              color="blue"
            />
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
