import React from "react";
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
import { useEffect, useState, eventsRef } from "react"

// export default function UpdateEvent(props) {
//   const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

//   return (
//     <div>
//       <Modal
//         applicationId="sandbox-scheduler"
//         onHide={() => props.setCreateModalStatus(false)}
//         show={props.showCreateModal}
//         htmlId="modal1"
//         backdropClickExit
//       >
//         <ModalHeader headerLabel="Edit Event" showCloseButton />
//         <ModalBody>
//           <div className="container">
//             <label>Title</label>
//             <div className="flex-container">
//               <Input
//                 className="input"
//                 value={newEvent.title}
//                 onChange={(e) =>
//                   setNewEvent({ ...newEvent, title: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           <div className="container">
//             <label>Start Date</label>
//             <div className="flex-container">
//               <Datetime
//                 dateFormat="DD/MM/YYYY"
//                 className="start-date"
//                 selected={newEvent.start}
//                 onChange={(start) =>
//                   setNewEvent({ ...newEvent, start: new Date(start) })
//                 }
//               />
//             </div>
//           </div>
//           <div className="container">
//             <label>End Date</label>
//             <div className="flex-container">
//               <Datetime
//                 dateFormat="DD/MM/YYYY"
//                 className="end-date"
//                 placeholderText="End Date"
//                 selected={newEvent.end}
//                 onChange={(end) =>
//                   setNewEvent({ ...newEvent, end: new Date(end) })
//                 }
//               />
//             </div>
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button
//             children="Delete"
//             onClick={() => props.setCreateModalStatus(false)}
//             color="default"
//             className="del"
//           />
//           <Button
//             children="Close"
//             onClick={() => props.setCreateModalStatus(false)}
//             color="default"
//           />
//           <Button
//             children="update"
//             type="submit"
//             color="blue"
//             onClick={() => props.createEvent(props.newEvent)}
//           />
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

function UpdateEvent({ eventStart, eventEnd, eventTitle, modalClose }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateEvent, setUpdateEvent] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [takenDays, setTakenDays] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    if (eventStart) {
      setUpdateEvent({ title: eventTitle, start: eventStart, end: eventEnd });
    }
  }, [eventEnd, eventStart, eventTitle]);

  useEffect(() => {
    if (takenDays) {
      const getDatesAfterStart = takenDays.filter(
        (date) => date > updateEvent.start
      );

      const sortedDates = getDatesAfterStart.sort((a, b) => a - b);

      setMaxDate(sortedDates[0]);
    }
  }, [updateEvent, takenDays]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleUpdate() {
    const event = {
      title: updateEvent.title,
      start: updateEvent.start.toString(),
      end: updateEvent.end.toString(),
    };
    const response = eventsRef;
    response.on("value", function (snapshot) {
      let events = snapshot.val();
      const asArray = Object.entries(events);
      asArray.filter((e) => {
        if (e[1].start === eventStart) {
          eventsRef.child(e[0]).update(event);
        }
      });
    });
    closeModal();
    modalClose();
  }

  function verifyDates() {
    if (!updateEvent.start || !updateEvent.end || !updateEvent.title) {
      return true;
    }
    if (updateEvent.start > updateEvent.end) {
      return true;
    }

    const getDatesAfterStart = takenDays.filter(
      (date) => date > updateEvent.start
    );

    if (updateEvent.end > getDatesAfterStart[0]) {
      return true;
    }
  }

  return (
    <div>
      <button className="modal-button" onClick={openModal}>
        Update Event
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Events Modal"
        ariaHideApp={false}
      >
        <h2 className="add-event-title">Update Event</h2>
        <div className="event-data">
          {eventStart ? (
            <>
              <div className="event-fields">
                <input
                  type="text"
                  placeholder="Update Title"
                  value={updateEvent.title}
                  onChange={(e) =>
                    setUpdateEvent({ ...updateEvent, title: e.target.value })
                  }
                />
                <Datetime
                  placeholderText="Start Date"
                  selected={new Date(updateEvent.start)}
                  dateFormat="yyyy, MM, dd"
                  onChange={(start) =>
                    setUpdateEvent({ ...updateEvent, start })
                  }
                  excludeDates={takenDays}
                />
                <Datetime
                  placeholderText="End Date"
                  selected={new Date(updateEvent.end)}
                  dateFormat="yyyy, MM, dd"
                  onChange={(end) => setUpdateEvent({ ...updateEvent, end })}
                  excludeDates={takenDays}
                  maxDate={maxDate}
                />
              </div>
              <div className="bottom-buttons">
                <button
                  className="modal-button "
                  onClick={() => handleUpdate()}
                  disabled={verifyDates()}
                >
                  Update Event
                </button>
              </div>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

export default UpdateEvent;
