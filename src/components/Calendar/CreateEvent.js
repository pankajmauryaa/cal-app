import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@momentum-ui/react";

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
              <label>Title</label>
              <div className="flex-container">
                <input className="input" />
              </div>
            </div>
            <div className="container">
              <label>Start Date</label>
              <div className="flex-container">
                <Datetime />
              </div>
            </div>
            <div className="container">
              <label>End Date</label>
              <div className="flex-container">
                <Datetime className="end-date" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              children="Close"
              onClick={() => this.modal1.closeModal()}
              color="default"
            />
            <Button
              children="Create"
              type="submit"
              onClick={() => this.props.handleAddEvent()}
              color="blue"
            />
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
