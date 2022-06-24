import {
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import moment from "moment";
import { firestore } from "../config/firebase-config";

export const schedulerOption = {
  sandbox: { name: "Sandbox", color: "blue" },
  test: { name: "Testing", color: "orange" },
};

export const convertToUTC = (dateTime) => {
  return Number(moment(dateTime).utc().format("x"));
};

// firebase CRUD

export const addEvent = async (newEvent) => {
  addDoc(collection(firestore, "Events"), {
    ...newEvent,
    end: convertToUTC(newEvent.end),
    start: convertToUTC(newEvent.start),

    color: schedulerOption[newEvent.schedulertype]?.color,
  });
};

export const updateEvent = async (event, id) => {
  updateDoc(doc(firestore, "Events", id), {
    ...event,
    end: convertToUTC(event.end),
    start: convertToUTC(event.start),
    color: schedulerOption[event.schedulertype]?.color,
  });
};

export const deleteEvent = async (id) => {
  deleteDoc(doc(firestore, "Events", id));
};
