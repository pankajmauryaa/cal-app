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

// firebase CRUD

export const addEvent = async (newEvent) => {
  addDoc(collection(firestore, "Events"), {
    ...newEvent,
    end: Number(moment(newEvent.end).utc().format("x")),
    start: Number(moment(newEvent.start).utc().format("x")),
    color: schedulerOption[newEvent.schedulertype]?.color,
  });
};

export const updateEvent = async (event, id) => {
  updateDoc(doc(firestore, "Events", id), {
    ...event,
    end: Number(moment(event.end).utc().format("x")),
    start: Number(moment(event.start).utc().format("x")),
    color: schedulerOption[event.schedulertype]?.color,
  });
};

export const deleteEvent = async (id) => {
  deleteDoc(doc(firestore, "Events", id));
};
