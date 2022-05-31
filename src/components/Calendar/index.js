import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@momentum-ui/core/css/momentum-ui.min.css";
//import CreateEvent from "./CreateEvent";
import CreateEvent from "./functional";
import "../styles/index.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "My Event",
    start: new Date(2022, 4, 26, 2, 0, 0),
    end: new Date(2022, 4, 26, 3, 30, 0),
  },
]

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
        <CreateEvent/>
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
