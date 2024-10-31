import express, { request, response } from "express";

const app = express();
app.use(express.json());

const users = [];

app.post("/usuarios", (request, response) => {
  users.push(request.body);

  response.status(201).json(request.body);
});

app.get("/usuarios", (request, response) => {
  response.status(200).json(users);
});

app.listen(3000);
