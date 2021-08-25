require("dotenv").config();
const notesRouter = require("express").Router();
const Note = require("../models/Note");
const User = require("../models/User");
const userExtractor = require("../middleware/userExtractor");

//Obtener todas las notas
notesRouter.get("/", async (req, res) => {
  const userFilter = req.query.user
  if(userFilter){
    const notes = await Note.find({user: userFilter})
    res.json(notes)
  }else{
    const notes = await Note.find({}).populate("user", {
      name: 1,
      username: 1,
    });
    res.json(notes);
  }
});


//Obtener alguna nota por ID
notesRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    const note = await Note.findById(id);
    if (note) {
      return response.json(note);
    } else {
      response.status(400).end();
    }
  } catch (error) {
    next(error);
  }
});

//Editar una nota por ID
notesRouter.put("/:id", userExtractor, async (request, response, next) => {
  const id = request.params.id;
  const note = request.body;

  const noteUpdate = {
    content: note.content,
  };

  try {
    const result = await Note.findByIdAndUpdate(id, noteUpdate, { new: true });
    response.json(result);
  } catch (error) {
    next(error);
  }
});

//Eliminar una nota por ID
notesRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const id = request.params.id;

  try {
    await Note.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

//Agregar una nota
notesRouter.post("/", userExtractor, async (request, response, next) => {
  const { content } = request.body;

  const { userId } = request;

  const user = await User.findById(userId);

  if (!content) {
    return response.status(400).json({
      error: "Content is missing",
    });
  }

  const newNote = new Note({
    content,
    user,
  });

  try {
    const saveNote = await newNote.save();
    user.notes = user.notes.concat(saveNote._id);
    await user.save();
    response.json(saveNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
