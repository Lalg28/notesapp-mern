const supertest = require("supertest");
const { app } = require("../index");

const api = supertest(app);

const initialNotes = [
  {
    content: "Nota numero uno",
  },
  {
    content: "Nota numero dos",
  },
  {
    content: "Nota numero tres",
  },
];

const getAllNotesFromDB = async () => {
  const response = await api.get("/api/notes");
  return {
    contents: response.body.map((note) => note.content),
    response
  }
}


module.exports = { initialNotes, api, getAllNotesFromDB };
