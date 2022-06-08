import React, { useState } from "react";
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
import { ref, remove, update } from "firebase/database";
import { database } from "../../firebase-config";

export default function EditEvent(props) {
  const [title, setTitle] = useState(props.selectedObj.title);
  const [start, setStart] = useState(new Date(props.selectedObj.start));
  const [end, setEnd] = useState(new Date(props.selectedObj.end));
  return (
    <Modal
      applicationId="sandbox-scheduler"
      onHide={() => props.setCreateModalStatus(false)}
      show={props.showEditModal}
      htmlId="modal1"
      backdropClickExit
    >
      <ModalHeader headerLabel="Edit Event" showCloseButton />
      <ModalBody>
        <div className="container">
          <label>Title</label>
          <div className="flex-container">
            <Input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="container">
          <label>Start Date</label>
          <div className="flex-container">
            <Datetime
              dateFormat="DD/MM/YYYY"
              className="start-date"
              selected={start}
              value={start}
              onChange={(start) => setStart(new Date(start))}
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
              selected={end}
              value={end}
              onChange={(end) => setEnd(new Date(end))}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          children="Delete"
          color="red"
          onClick={() => {
            const event = ref(database, "Events/" + props.selectedObj.id);
            remove(event)
              .then(() => {
                props.setEditModalStatus(false);
              })
              .catch((error) => {
                props.setEditModalStatus(false);
              });
          }}
        />
        <Button
          children="Edit"
          type="submit"
          color="blue"
          onClick={() => {
            const event = ref(database, "Events/" + props.selectedObj.id);
            update(event, {
              title: title,
              start: start,
              end: end,
            })
              .then(() => {
                props.setEditModalStatus(false);
              })
              .catch((error) => {
                props.setEditModalStatus(false);
              });
          }}
        />
        <Button
          children="Close"
          onClick={() => props.setEditModalStatus(false)}
          color="default"
        />
      </ModalFooter>
    </Modal>
  );
}
