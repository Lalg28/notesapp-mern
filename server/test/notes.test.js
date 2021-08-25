const mongoose = require("mongoose");
const { server } = require("../index");
const { initialNotes, api, getAllNotesFromDB } = require("./helpers");
const Note = require("../models/Note");

beforeEach(async () => {
  await Note.deleteMany({});

  const note1 = new Note(initialNotes[0]);
  await note1.save();

  const note2 = new Note(initialNotes[1]);
  await note2.save();

  const note3 = new Note(initialNotes[2]);
  await note3.save();
});

test("There r notes in te database", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(initialNotes.length);
});

test("The notes have some content", async () => {
  const { contents } = await getAllNotesFromDB();
  expect(contents).toContain("Nota numero uno");
});

test("A valid note can be added", async () => {
  const newNote = {
    content: "This is a new note",
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const { contents, response } = await getAllNotesFromDB();

  expect(response.body).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain(newNote.content);
});

test("A note can be deleted", async () => {
  const { response } = await getAllNotesFromDB();
  const { body: notes } = response;
  console.log(response);
  const noteToDelete = notes[0];

  await api.delete(`/api/notes/${noteToDelete.id}`);
});

test('A note that no exist cant be deleted', async () => {
  await api
    .delete(`/api/notes/1234`)
    .expect(400)

  const { response } = await getAllNotesFromDB()

  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
