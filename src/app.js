const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();
app.use(express.json());
app.use(cors());

 
const repositories = [];
app.get("/repositories", (request, response) => {
    return response.status(200).json(repositories); 
});

app.post("/repositories", (request, response) => {
    const {title, url, tecs, like} = request.body; 

    const repository = {
      id: uuid(), 
      title, 
      url, 
      tecs, 
      like, 
    }

    repositories.push(repository); 
    return response.json(repository); 

});

app.put("/repositories/", (request, response) => {
    const {id} = request.query;  
    const {title, url, tecs, like} = request.body; 

    const indexIdRepository = repositories.findIndex(repository => repository.id === id); 

    if (indexIdRepository < 0) {
      return response.status(400).json({"error": "ID not Found"});
    }
  
    const repository = {
        id, 
        title, 
        url, 
        tecs, 
        like, 
    }; 

    repositories[indexIdRepository] = repository; 
    return response.status(200).json(repository); 

});

app.delete("/repositories/", (request, response) => {
    const {id} = request.query; 
  
    const indexIdRepository = repositories.findIndex(repository => repository.id === id); 
    if (indexIdRepository < 0) {
      return response.status(400).json({"error": "ID not Found"});
    }
    repositories.splice(indexIdRepository,1); 
    return response.status(200).send(); 
});

app.post("/repositories/like/", (request, response) => {
  const {id} = request.body;  
  
  const indexIdRepository = repositories.findIndex(repository => repository.id === id); 
  if (indexIdRepository < 0) {
    return response.status(400).json({"error": "ID not Found"});
  }
  const like = repositories[indexIdRepository].like + 1; 

  repository =  {
      id, 
      like, 
  }; 

  repositories[indexIdRepository] = repository; 
  console.log(repository); 
  return response.status(200).json(repository)

});

module.exports = app;
