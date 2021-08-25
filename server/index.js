require("dotenv").config();
require("./mongo");
const express = require("express");
const app = express();
const cors = require("cors");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const notFound = require("./middleware/notFound.js");
const handleError = require("./middleware/handleError");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use(cors());
app.use(express.json());

Sentry.init({
  dsn: "https://381d238607b6441586682ff6d71a0bfe@o948295.ingest.sentry.io/5897495",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

// Sentry malwares
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Pagina de inicio
app.get("/", (req, response) => {
  response.send("<h1>Hello world</h1>");
});

//Controllers
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

// Middlewares
app.use(notFound);
app.use(Sentry.Handlers.errorHandler());
app.use(handleError);

// Correr el servidor
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
