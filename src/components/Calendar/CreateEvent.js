import React, { useState } from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from '@momentum-ui/react'

function CreateEvent(props) {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' })
  return (
    <Modal
      applicationId="sandbox-scheduler"
      onHide={() => props.setCreateModalStatus(false)}
      show={props.showCreateModal}
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
              onChange={(start) =>
                setNewEvent({ ...newEvent, start: new Date(start) })
              }
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
              onChange={(end) =>
                setNewEvent({ ...newEvent, end: new Date(end) })
              }
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          children="Close"
          onClick={() => props.setCreateModalStatus(false)}
          color="default"
        />
        <Button
          children="Create"
          type="submit"
          color="blue"
          onClick={() => props.createEvent(newEvent)}
        />
      </ModalFooter>
    </Modal>
  )
}

export default CreateEvent
