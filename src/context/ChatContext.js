import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  messages: [],
  contacts: [],
  contacts_loading: false,
  activeContact: null,
  attachments: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_messages":
      return { ...state, messages: action.payload.data };
    case "add_message":
      return { ...state, messages: [...state.messages, action.payload.data] };
    case "set_contacts":
      return { ...state, contacts: action.payload.contacts };
    case "set_active_contact":
      return { ...state, activeContact: action.payload };
    case "add_contact":
      const contact = action.payload.contact;
      const id = contact.uuid;

      let existingObject = state.contacts.find(
        (obj) => obj.contact.uuid === id
      );
      if (!existingObject) {
        let newObject = {
          message: action.payload.content,
          created_at: new Date(),
          message_type: "sent",
          contact: { ...contact },
        };
        //return { ...state, contacts: { ...state.contacts, newObject } };
      }
      break;
    case "add_attachment":
      let attachment = { src: action.payload, uploaded: false };
      return { ...state, attachments: [...state.attachments, attachment] };
    case "reset_attachment":
      return { ...state, attachments: [] };

    case "set_uploaded_attachment_status":
      let updatedAttachments = [...state.attachments];
      let lastIndex = state.attachments.length - 1;
      updatedAttachments[lastIndex] = action.payload;
      updatedAttachments[lastIndex].uploaded = true;
      return { ...state, attachments: updatedAttachments };

    case "set_contacts_loading":
      return { ...state, contacts_loading: action.payload };
    case "set_loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getMessages = (dispatch) => {
  return async (id, type) => {
    setActiveContact(dispatch)(id);
    setLoading(dispatch, true);
    try {
      const response = await api.get("/messages/" + id + "?type=" + type);
      dispatch({
        type: "set_messages",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const appendMessages = (dispatch) => {
  return async (id, type, page) => {
    setActiveContact(dispatch)(id);
    setLoading(dispatch, true);
    try {
      const response = await api.get("/messages/" + id + "?type=" + type + "&page=" + page);
      if (response.data.data) {
        for (var i = response.data.data.length - 1; i >= 0; i--) {
          if (response.data.data[i] && response.data.data[i] != undefined) {
            dispatch({
              type: "add_message",
              payload: response.data.data[i],
            });
          }

        }
      }


    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const getContacts = (dispatch) => {
  return async (type) => {
    try {
      setContactsLoading(dispatch, true);
      const response = await api.get("/my-contacts?type=" + type);
      dispatch({
        type: "set_contacts",
        payload: response.data,
      });
      setContactsLoading(dispatch, false);
    } catch (error) {
      setContactsLoading(dispatch, false);
    }
  };
};

const sendMessage = (dispatch) => {
  return async (sender_id, receiver_id, message, type, cb = () => { }) => {
    dispatch({
      type: "reset_attachment",
    });
    try {
      const response = await api.post("/messages", {
        sender_id,
        receiver_id,
        message,
        type,
      });
      //addMessage(dispatch)(response.data);
    } catch (error) { }
    cb();
  };
};

const addNewContact = (dispatch) => {
  return (contact, content) => {
    dispatch({
      type: "add_contact",
      payload: { contact, content },
    });
  };
};

const addMessage = (dispatch) => {
  return (data) => {
    dispatch({
      type: "add_message",
      payload: data,
    });
  };
};

const setLoading = (dispatch, status) => {
  dispatch({
    type: "set_loading",
    payload: status,
  });
};

const setContactsLoading = (dispatch, status) => {
  dispatch({
    type: "set_contacts_loading",
    payload: status,
  });
};

const setActiveContact = (dispatch) => {
  return (id) => {
    dispatch({
      type: "set_active_contact",
      payload: id,
    });
  };
};

const uploadAttachment = (dispatch) => {
  return async (data, src, cb = () => { }) => {
    dispatch({
      type: "add_attachment",
      payload: src,
    });
    cb("upload_start", { src: src, uploaded: false });
    try {
      const response = await api.post("/attachments", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "set_uploaded_attachment_status",
        payload: response.data.data,
      });
      cb("upload_finish", response.data.data);
    } catch (error) { }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getMessages,
    getContacts,
    sendMessage,
    addMessage,
    addNewContact,
    uploadAttachment,
    appendMessages
  },
  state
);
