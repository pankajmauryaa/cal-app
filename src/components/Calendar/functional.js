import React, { useState, useRef } from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from '@momentum-ui/react'

function CreateEvent(props) {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false)
  const confirmRemoveModalRef = useRef()

  return (
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
              <Input className="input" />
            </div>
          </div>
          <div className="container">
            <label>Start Date</label>
            <div className="flex-container">
              <Datetime className='start-date' />
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
            onClick={() => confirmRemoveModalRef.current.closeModal()}
            color="default"
          />
          <Button
            children="Create"
            type="submit"
            color="blue"
          />
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CreateEvent
