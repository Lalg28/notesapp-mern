const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

//Obtener usuarios
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
  });
  res.json(users);
});

//Obtener usuario por id
usersRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("notes", {
      content: 1,
    })
    if(user){
      return res.json(user)
    }else{
      res.status(400).end
    }
  } catch (error) {
    next(error)
  }
});

//Crear un usuario
usersRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { username, name, password } = body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    res.status(400).json(error.errors.username.message);
  }
});

module.exports = usersRouter;
