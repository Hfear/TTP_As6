const express = require("express");
const iceCreams = require("./iceCreams");
const app = express();
const port = 4000;

app.use((req, res, next) => {
    res.on("finish", () => {
      console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
  });
app.use(express.json()) 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// List all iceCreams
app.get("/iceCreams", (req, res) => {
    res.send(iceCreams);
  });
  

  // Get a specific flavor
  app.get("/iceCreams/:id", (req, res) => {
    const flavorId = parseInt(req.params.id, 10);
    const iceCream = iceCreams.find((iceCream) => iceCream.id === flavorId);
    if(iceCream){
      res.send(iceCream);  
    } else{
        res.status(404).send({message : "Flavor not found"});
    }
    
  });
  

  // Create a new flavor
  function getNextIdFromCollection(collection) {
    if(collection.length === 0) return 1; 
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
  }

app.post("/iceCreams", (req, res) => {
    const newFlavor = req.body;
    jobs.push(newFlavor);
    res.status(201).send(newFlavor);
  });
  

  // Update a specific ice cream
app.patch("/iceCreams/:id", (req, res) => {
    const FlavorId = parseInt(req.params.id, 10);
    const CreamUpdates = req.body;
    const FlavorIndex = iceCreams.findIndex((icecream) => icecream.id === FlavorId);
    const updatediceCream = { ...iceCreams[FlavorIndex], ...CreamUpdates };
    if (FlavorIndex !== -1) {
      iceCreams[FlavorIndex] = updatediceCream;
      res.send(updatediceCream);
    } else {
      res.status(404).send({ message: "Flavor not found" });
    }
  });


// Delete a specific ice cream
app.delete("/iceCreams/:id", (req, res) => {
    const FlavorId = parseInt(req.params.id, 10);
    const CreamIndex = iceCreams.findIndex((icecream) => icecream.id === FlavorId);
    if (CreamIndex !== -1) {
      iceCreams.splice(FlavorIndex, 1);
      res.send({ message: "deleted successfully" });
    } else {
      res.status(404).send({ message: " not found" });
    }
  });
  

module.exports = iceCreams; 