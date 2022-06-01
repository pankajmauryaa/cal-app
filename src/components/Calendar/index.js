import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useRef } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@momentum-ui/core/css/momentum-ui.min.css";
// import CreateEvent from "./CreateEvent";
// import CreateEvent from "./functional";
import "../styles/index.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "@momentum-ui/react";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "My Event-1",
    start: new Date(2022, 5, 15, 2, 0, 0),
    end: new Date(2022, 5, 15, 3, 30, 0),
  },
  {
    title: "My Event-2",
    start: new Date(2022, 5, 16, 2, 0, 0),
    end: new Date(2022, 5, 16, 3, 30, 0),
  },
];

export default function Cal() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const confirmRemoveModalRef = useRef();

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div>
      <h1 className="heading">Sandbox Scheduler</h1>
      <div className="btn">
        {/* <CreateEvent /> */}
        <div className="row">
          <Button
            children="Create Event"
            onClick={() => setShowConfirmRemove({ showConfirmRemove: true })}
            color="blue"
          />
          <Modal
            applicationId="sandbox-scheduler"
            onHide={() => setShowConfirmRemove(false)}
            show={showConfirmRemove}
            ref={confirmRemoveModalRef}
            htmlId="modal1"
            backdropClickExit
          >
            <ModalHeader headerLabel="Create Event" showCloseButton />
            <ModalBody>
              <div className="container">
                <label>Title</label>
                <div className="flex-container">
                  <Input
                    className="input"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="container">
                <label>Start Date</label>
                <div className="flex-container">
                  <Datetime
                    dateFormat="DD/MM/YYYY"
                    className="start-date"
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({ ...newEvent, start })}
                  />
                </div>
              </div>
              <div className="container">
                <label>End Date</label>
                <div className="flex-container">
                  <Datetime
                    dateFormat="DD/MM/YYYY"
                    className="end-date"
                    placeholderText="End Date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({ ...newEvent, end })}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                children="Close"
                onClick={() => confirmRemoveModalRef.current.closeModal()}
                color="default"
              />
              <Button
                children="Create"
                type="submit"
                color="blue"
                onClick={handleAddEvent}
              />
            </ModalFooter>
          </Modal>
        </div>
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
