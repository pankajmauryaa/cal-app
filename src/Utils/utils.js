import {
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { firestore } from "../config/firebase-config";

export const schedulerOption = {
  sandbox: { name: "Sandbox", color: "blue" },
  test: { name: "Testing", color: "orange" },
};

// firebase CRUD

export const addEvent = async (newEvent) => {
  addDoc(collection(firestore, "Events"), {
    ...newEvent,
    color: schedulerOption[newEvent.schedulertype]?.color,
  });
};

export const updateEvent = async (event, id) => {
  updateDoc(doc(firestore, "Events", id), {
    ...event,
  });
};

export const deleteEvent = async (id) => {
  deleteDoc(doc(firestore, "Events", id));
};
