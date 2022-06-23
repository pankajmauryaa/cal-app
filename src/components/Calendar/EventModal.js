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
  Select,
  SelectOption,
} from "@momentum-ui/react";
import {
  addEvent,
  deleteEvent,
  schedulerOption,
  updateEvent,
} from "../../Utils/utils";
import moment from "moment";

function EventModal(props) {
  const {
    showCreateModal,
    setCreateModalStatus,
    showEditModal,
    setEditModalStatus,
    selectedObj,
  } = props;

  const initialValues = {
    title: showCreateModal ? "" : selectedObj.title,
    schedulertype: showCreateModal ? "" : selectedObj.schedulertype,
    description: showCreateModal ? "" : selectedObj.description,
    start: showCreateModal ? "" : moment(props.selectedObj.end).utc(),
    end: showCreateModal ? "" : moment(props.selectedObj.end).utc(),
    color: showCreateModal ? "" : selectedObj.color,
  };

  const [event, setEvent] = useState(initialValues);
  const [inProgress, setInProgress] = useState(false);
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);

  const handleCreate = (newEvent) => {
    if (
      newEvent.title === "" ||
      newEvent.schedulertype === "" ||
      newEvent.start === "" ||
      newEvent.end === ""
    ) {
      setIsFieldsEmpty(true);
      return;
    }
    setInProgress(true);
    console.log(newEvent);
    addEvent(newEvent)
      .then(() => {
        setCreateModalStatus(false);
        setInProgress(false);
        isFieldsEmpty && setIsFieldsEmpty(false);
      })
      .catch((error) => {
        setInProgress(false);
        console.error(error.message);
      });
  };

  const handleEdit = () => {
    setInProgress(true);
    updateEvent(event, selectedObj.id)
      .then(() => {
        setInProgress(false);
        setEditModalStatus(false);
      })
      .catch((error) => {
        console.error(error.message);
        setInProgress(false);
        setEditModalStatus(false);
      });
  };

  const handleDelete = () => {
    setInProgress(true);
    deleteEvent(selectedObj.id)
      .then(() => {
        setInProgress(false);
        setEditModalStatus(false);
      })
      .catch((error) => {
        console.error(error.message);
        setInProgress(false);
        setEditModalStatus(false);
      });
  };

  return (
    <div className="modal">
      <Modal
        applicationId="sandbox-scheduler"
        onHide={() => {
          setCreateModalStatus(false);
          setEditModalStatus(false);
        }}
        show={showCreateModal || showEditModal}
        size="medium"
        htmlId="modal"
        backdropClickExit
        className="modal"
      >
        <ModalHeader headerLabel="Create Event" showCloseButton />
        <ModalBody>
          <div className="container">
            <div className="options">
              <label>Title</label>
              <Input
                className="input"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
            </div>
            <div className="options">
              <label>Type</label>
              <Select
                defaultValue={`${
                  showCreateModal
                    ? "Select Scheduler"
                    : schedulerOption[event.schedulertype].name
                }`}
                className="input"
                selected={event.schedulertype}
                value={event.selected}
              >
                {Object.keys(schedulerOption).map((option) => (
                  <SelectOption
                    id={option}
                    key={option}
                    value={schedulerOption[option].name}
                    label={schedulerOption[option].name}
                    onClick={() =>
                      setEvent({
                        ...event,
                        schedulertype: option,
                      })
                    }
                  />
                ))}
              </Select>
            </div>
            <div className="options">
              <label>Start Date</label>
              <Datetime
                dateFormat="DD/MM/YYYY"
                className="input"
                selected={event.start}
                value={new Date(event.start)}
                onChange={(start) =>
                  setEvent({
                    ...event,
                    start: new Date(start).toString(),
                  })
                }
              />
            </div>
            <div className="options">
              <label>End Date</label>
              <Datetime
                dateFormat="DD/MM/YYYY"
                className="input"
                selected={event.end}
                value={new Date(event.end)}
                onChange={(end) =>
                  setEvent({
                    ...event,
                    end: new Date(end).toString(),
                  })
                }
              />
            </div>
            <div className="options">
              <label>Description</label>
              <textarea
                className="input"
                selected={event.description}
                value={event.description}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isFieldsEmpty && (
            <p className="empty-fields-error"> Please fill all the fields</p>
          )}
          <Button
            children="Close"
            onClick={() => {
              setCreateModalStatus(false);
              setEditModalStatus(false);
            }}
            color="default"
          />
          {showCreateModal && (
            <Button
              children="Create"
              type="submit"
              color="blue"
              onClick={() => handleCreate(event)}
              disabled={inProgress}
              loading={inProgress}
            />
          )}
          {showEditModal && (
            <>
              <Button
                children="Edit"
                type="submit"
                color="blue"
                onClick={() => {
                  handleEdit();
                }}
                disabled={inProgress}
                loading={inProgress}
              />
              <Button
                children="Delete"
                color="red"
                onClick={() => {
                  handleDelete();
                }}
                disabled={inProgress}
                loading={inProgress}
              />
            </>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EventModal;
