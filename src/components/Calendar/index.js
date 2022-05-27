import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "@momentum-ui/core/css/momentum-ui.min.css";
import "./Index.css";
import { Input, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label,} from "@momentum-ui/react";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "My Event",
    start: new Date(2022, 4, 26, 2, 0, 0),
    end: new Date(2022, 4, 26, 3, 30, 0),
  },
];

class EventModal extends React.PureComponent {
  
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
                <Input placeholder="Add title" />
              </div>
            </div>
            <div className="container">
              <Label>Start Date</Label>
              <div className="flex-container">
              <Datetime children="End Date and Time"/>
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
              // onClick={()}
              ariaLabel="Submit Form"
              color="blue"
            />
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}



export default function Cal(props) {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div>
      <h1 className="heading">Sandbox Scheduler</h1>
      <div className="btn">
        <EventModal/>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "80px" }}
        timeslots={1}
      />
    </div>
  );
}


/*

        <Input
          inputSize="small-5"
          placeholder="Add Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <Datetime
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <Datetime
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <Button ariaLabel="Test" color="blue" onClick={handleAddEvent}>
          Add Event
        </Button>
      </div>
*/