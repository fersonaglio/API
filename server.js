import express, { request, response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

//POST
app.post("/usuarios", async (request, response) => {
  await prisma.user.create({
    data: {
      name: request.body.email,
      age: request.body.age,
      email: request.body.name,
    },
  });

  response.status(201).json(request.body);
});

//GET
app.get("/usuarios", async (request, response) => {
  let users = [];

  if (request.query) {
    users = await prisma.user.findMany({
      where: {
        name: request.query.name,
        email: request.query.email,
        age: request.query.age,
      },
    });
  } else {
    const users = await prisma.user.findMany();
  }

  response.status(200).json(users);
});

//PUT
app.put("/usuarios/:id", async (request, response) => {
  await prisma.user.update({
    where: {
      id: request.params.id,
    },

    data: {
      name: request.body.email,
      age: request.body.age,
      email: request.body.name,
    },
  });

  response.status(201).json(request.body);
});

//DEL
app.delete("/usuarios/:id", async (request, response) => {
  await prisma.user.delete({
    where: {
      id: request.params.id,
    },
  });

  response.status(200).json({ message: "Usuário deletado com sucesso" });
});

app.listen(3000);

//pasword: QjgKda5HxLc52peZ
