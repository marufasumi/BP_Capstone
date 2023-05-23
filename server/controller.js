let userData = require("./db.json");
let globalId =3;

module.exports={
    getAlluser:(req, res) => {
        let allUser =userData;
        
          res.status(200).send(allUser);
          console.log("sending response");
},
createUser: (req, res) => {
let {fullName, day, beforeBreakfast, afterBreakfast, beforeLunch, afterLunch, beforeDinner, afterDinner} = req.body
// id = globalId
newform = {
  id: globalId,
  fullName: fullName, 
  day: day,
  beforeBreakfast: beforeBreakfast, 
  afterBreakfast: afterBreakfast, 
  beforeLunch: beforeLunch, 
  afterLunch: afterLunch, 
  beforeDinner: beforeDinner,
  afterDinner: afterDinner
}
userData.push(newform);
res.status(200).send(userData);
globalId++;
//console.log(id)
},
updateUser: (req, res) => {
    const id = +req.params.id;// beacuse of missing  this + sign i was not able to edit repeatedly
    let {fullName, day, beforeBreakfast, afterBreakfast, beforeLunch, afterLunch, beforeDinner, afterDinner} = req.body
    const index = userData.findIndex((record) => record.id === id);//
    let updatedData = {
      id: id,
      fullName: fullName, 
      day: day,
      beforeBreakfast: beforeBreakfast, 
      afterBreakfast: afterBreakfast, 
      beforeLunch: beforeLunch, 
      afterLunch: afterLunch, 
      beforeDinner: beforeDinner,
      afterDinner: afterDinner
    }
    //const updatedData = req.body;
    
    console.log(index)
  
    if (index !== -1) {
      userData[index] = updatedData;
      res.status(200).send(updatedData);
      console.log(userData, "user updated")
    } else {
      res.status(404).send("Record not found.");
    }
    console.log("Sent response for updating data");
    console.log(userData)
  },
  deleteUser: (req, res) => {
    const id = +req.params.id; // beacuse of missing + sign i was not able to delete the record
    const index = userData.findIndex((record) => record.id === id);
    if (index !== -1) {
      userData.splice(index, 1);
      res.status(200).send("Record deleted successfully.");
      console.log("user deleted")
    } else {
      res.status(404).send("Record not found.");
    }
  }
  
  
}
