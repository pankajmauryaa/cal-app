import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@momentum-ui/core/css/momentum-ui.min.css";
import "../styles/index.css";
import "react-datetime/css/react-datetime.css";
import { Button } from "@momentum-ui/react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import CreateEvent from "./CreateEvent";
import UpdateEvent from "./UpdateEvent";

const localizer = momentLocalizer(moment);

export default function Cal() {
  const [allEvents, setAllEvents] = useState([]);
  const [showCreateModal, setCreateModalStatus] = useState(false);
  const [ eventData, setEventData ] = useState([])

  const userCollectionRef = collection(db, "events");

  //Create Operation
  const createEvent = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
    addDoc(userCollectionRef, {
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
    });
    setCreateModalStatus(false);
  };

  function handleShow() {
		setCreateModalStatus(true)
	}

  // Read Operation
  useEffect(() => {
    const getEvents = async () => {
      const querySnapshot = await getDocs(userCollectionRef);
      querySnapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
      });

      setAllEvents(
        querySnapshot.docs.map((doc) => ({
          ...doc.querySnapshot(),
          id: doc.id,
        }))
      );
    };
    getEvents();
  }, []);

  return (
    <div>
      <h1 className="heading">Sandbox Scheduler</h1>
      <div className="btn">
        <div className="row">
          <Button
            children="Create Event"
            onClick={() => setCreateModalStatus(true)}
            color="blue"
          />
          {showCreateModal && (
            <CreateEvent
              showCreateModal={showCreateModal}
              setCreateModalStatus={setCreateModalStatus}
              createEvent={createEvent}
            />
          )}
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "80px" }}
        timeslots={1}
        popup
				onSelectEvent={(event) => {
					handleShow()
					setEventData(event)
				}}
      />
    </div>
  );
}
