
//let globalId =3;
//let newform={};
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let userData = require("./db.json");

const {getAlluser, createUser, updateUser, deleteUser}=require('./controller')// important step to connect controller file with index.js (first step)

app.get('/api/form',getAlluser);
app.post(`/api/form`, createUser)
app.put(`/api/form/:id`, updateUser)
app.delete(`/api/form/:id`, deleteUser)

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});


