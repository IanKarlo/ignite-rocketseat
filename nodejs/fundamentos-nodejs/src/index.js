const express = require("express");

const app = express();

app.use(express.json());

app.get('/courses', (req, res) => {
  return res.json(['Curso 1', 'Curso 2', 'Curso 3']);
});

app.post('/courses', (req, res) => {
  return res.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.put('/courses/:id', (req, res) => {
  return res.json(['Curso 6', 'Curso 2', 'Curso 3', 'Curso 4']);
})

app.patch('/courses/:id', (req, res) => {
  return res.json(['Curso 1', 'Curso 7', 'Curso 3', 'Curso 4']);
})

app.delete('/courses/:id', (req, res) => {
  return res.json(['Curso 1', 'Curso 2', 'Curso 4']);
})

app.listen(8080, () => {
  console.log("App listen on port 8080");
});