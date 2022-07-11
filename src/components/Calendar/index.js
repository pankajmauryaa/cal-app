import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@momentum-ui/core/css/momentum-ui.css";
import "../../styles/index.css";
import "react-datetime/css/react-datetime.css";
import { Button } from "@momentum-ui/react";
import { firestore } from "../../config/firebase-config";
import EventModal from "./EventModal";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const localizer = momentLocalizer(moment);

export default function Cal() {
  const [allEvents, setAllEvents] = useState([]);
  const [showCreateModal, setCreateModalStatus] = useState(false);
  const [showEditModal, setEditModalStatus] = useState(false);
  const [selectedEventObj, setSelectedEventObj] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  const populatEventFunction = (startRange, endRange) => {
    
    const q = query(
      collection(firestore, "Events"),
      where("end", ">=", startRange),
      where("end", "<=", endRange)
    );

    const eventListner = onSnapshot(q, async (doc) => {
      if (doc.docs) {
        let arrfromobj = doc.docs.map((data) => {
          let obj = {
            id: data.id,
            title: data.data().title,
            start: new Date(data.data().start),
            end: new Date(data.data().end),
            description: data.data().description,
            schedulertype: data.data().schedulertype,
            color: data.data().color,
          };
          return obj;
        });
        let resolved = await Promise.all(arrfromobj);
        setAllEvents(resolved);
        console.log(resolved);
        setIsFetching(false);
      } else {
        setAllEvents([]);
        setIsFetching(false);
      }
    });
    return eventListner;
  };
  useEffect(() => {
    const tempDt = new Date();
    const currentMonthStartDate = new Date(
      tempDt.getFullYear(),
      tempDt.getMonth(),
      1
    ).getTime();
    const currentMonthENdDate = new Date(
      tempDt.getFullYear(),
      tempDt.getMonth() + 1,
      1
    ).getTime();
    return populatEventFunction(currentMonthStartDate, currentMonthENdDate);
  }, []);

  // to style the events
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event?.color,
      borderRadius: "5px",
      opacity: 1,
      color: "white",
      display: "block",
    };
    return { style };
  };

  if (isFetching) {
    return (
      <div className="spinner main">
        <i
          id="loading-spinner"
          className="md-spinner md-spinner--36 md-spinner--blue"
        />
        <p className="wait-message">Please wait, fetching data...</p>
      </div>
    );
  }

  return (
    <div className="main">
      <h1 className="heading">Event Scheduler</h1>
      <div className="create-btn">
        <div className="row-end">
          <Button
            className="head"
            children="Create Event"
            onClick={() => setCreateModalStatus(true)}
            color="blue"
          />
          {(showCreateModal || showEditModal) && (
            <EventModal
              showCreateModal={showCreateModal}
              setCreateModalStatus={setCreateModalStatus}
              showEditModal={showEditModal}
              setEditModalStatus={setEditModalStatus}
              selectedObj={selectedEventObj}
            />
          )}
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={allEvents}
        onSelectEvent={(e) => {
          setSelectedEventObj(e);
          setEditModalStatus(true);
        }}
        onRangeChange={(range, view) => {
          if (range.start || view === "month") {
            return populatEventFunction(
              new Date(range.start).getTime(),
              new Date(range.end).getTime()
            );
          } else if (range.length === 7) {
            return populatEventFunction(
              new Date(range[0]).getTime(),
              new Date(range[6]).getTime()
            );
          } else if (range.length === 1) {
            var startDate = new Date(range[0]);
            var day = 60 * 60 * 24 * 1000;
            var endDate = new Date(startDate.getTime() + day);
            return populatEventFunction(startDate.getTime(), endDate.getTime());
          }
        }}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px", width: "80%" }}
        timeslots={1}
        eventPropGetter={eventStyleGetter}
        popup="true"
      />
    </div>
  );
}
