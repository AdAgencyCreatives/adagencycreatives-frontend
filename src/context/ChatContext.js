import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  messages: [],
  contacts: [],
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
    case "add_attachment":
      let attachment = { src: action.payload, uploaded: false };
      return { ...state, attachments: [...state.attachments, attachment] };
    case "reset_attachment":
      return { ...state, attachments: [] };

    case "set_uploaded_attachment_status":
      let updatedAttachments = [...state.attachments];
      let lastIndex = state.attachments.length - 1;
      updatedAttachments[lastIndex].uploaded = true;
      updatedAttachments[lastIndex].url = action.payload;
      return { ...state, attachments: updatedAttachments };

    case "set_loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getMessages = (dispatch) => {
  return async (id) => {
    setActiveContact(dispatch)(id);
    setLoading(dispatch, true);
    try {
      const response = await api.get("/messages/" + id);
      dispatch({
        type: "set_messages",
        payload: response.data,
      });
    } catch (error) {}
    setLoading(dispatch, false);
  };
};

const getContacts = (dispatch) => {
  return async (type) => {
    try {
      const response = await api.get("/my-contacts?type=" + type);
      dispatch({
        type: "set_contacts",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const sendMessage = (dispatch) => {
  return async (sender_id, receiver_id, message, type, cb = () => {}) => {
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
      addMessage(dispatch)(response.data);
    } catch (error) {}
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

const setActiveContact = (dispatch) => {
  return (id) => {
    dispatch({
      type: "set_active_contact",
      payload: id,
    });
  };
};

const uploadAttachment = (dispatch) => {
  return async (data, src) => {
    dispatch({
      type: "add_attachment",
      payload: src,
    });
    try {
      const response = await api.post("/attachments", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "set_uploaded_attachment_status",
        payload: response.data.data.url,
      });
    } catch (error) {}
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
  },
  state
);
