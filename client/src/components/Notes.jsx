import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { map, size } from "lodash";
import {
  getNoteUser,
  addNote,
  deleteNote,
  getNoteByID,
  updateNote,
} from "../api/NotesApi";
import { getUserData } from "../api/UsersApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Notes() {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState(undefined);
  const [editInfo, setEditInfo] = useState({});
  const { auth, logout, setReloadUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      const response = await getNoteUser(auth.idUser, logout);
      if (size(response) > 0) setNotes(response);
      else setNotes([]);
    })();
    setReloadUser(false);
  }, [logout, setReloadUser, auth]);

  useEffect(() => {
    (async () => {
      const response = await getUserData(auth.idUser, logout);
      setUser(response);
    })();
  }, [auth, logout]);

  const onSubmit = (data) => {
    setLoading(true);
    if (update) {
      updateNote(editInfo.id, data, logout);
      setUpdate(false);
    } else {
      addNote(data, logout);
    }
    reset();
    setLoading(false);
    setReloadUser(true);
  };

  const editNote = async (id) => {
    setUpdate(true);
    const response = await getNoteByID(id, logout);
    setEditInfo(response);
  };

  const removeNote = (id) => {
    deleteNote(id, logout);
    setReloadUser(true);
  };

  return (
    <div className="notesapp">
      <div className="header">
        <div className="header__container container">
          <div className="logo">Notes App</div>
          <div className="account">
            <button>
              <FontAwesomeIcon icon={faUser} /> {user?.username}
            </button>
            <button onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col notes">
            <h1>Notas ({size(notes)})</h1>
            <hr />
            {!notes && <div className="spinner-border text-light" />}
            {notes && size(notes) === 0 && (
              <>
                <h3 style={{ color: "white" }}>No hay notas disponibles</h3>
              </>
            )}
            {size(notes) > 0 && (
              <NotesList
                notes={notes}
                removeNote={removeNote}
                editNote={editNote}
              />
            )}
          </div>
          <div className="col addNote">
            <h1>{update ? "Editar" : "Agregar"} una nota</h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                {...register("content", { required: true })}
                defaultValue={update ? editInfo.content : ""}
              />
              {errors.content && (
                <span style={{ color: "white" }}>
                  Debes de agregar una nota
                </span>
              )}
              <button>
                {loading ? (
                  <div className="spinner-border text-warning" />
                ) : (
                  `${update ? "Editar Nota" : "Agregar Nota"}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const NotesList = (props) => {
  const { notes, removeNote, editNote } = props;
  return (
    <div className="addedNotes">
      {map(notes, (note) => (
        <div key={note.id}>
          <div className="d-flex justify-content-between align-items-center">
            <p className="m-0">{note.content}</p>
            <div className="actions col-3 ms-3">
              <button
                className="btn btn-outline-warning"
                onClick={() => editNote(note.id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => removeNote(note.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Notes;
