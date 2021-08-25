const mongoose = require("mongoose");
const { server } = require("../index");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { api } = require("./helpers");

describe("creating a new user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("pswd", 10);
    const user = new User({ username: "test", passwordHash });

    await user.save();
  });

  test("Works as expected creating a fresh username", async () => {
    const usersDB = await User.find({});
    const usersAtStart = usersDB.map(user => user.toJSON());

    const newUser = {
      username: "AVR10",
      name: "Azucena",
      password: "Kiwimadafaka",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersDBAfter = await User.find({});
    const usersAtEnd = usersDBAfter.map((user) => user.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
  
});
