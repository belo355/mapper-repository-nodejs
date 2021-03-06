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
    const {title, url, techs} = request.body; 

    const repository = {
      id: uuid(), 
      title, 
      url, 
      techs, 
      likes: 0, 
    }

    repositories.push(repository); 
    return response.status(200).json(repository); 

});

app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;  
    const {title, url, techs} = request.body; 

    const indexIdRepository = repositories.findIndex(repository => repository.id === id); 

    if (indexIdRepository < 0) {
      return response.status(400).json({error: "ID not Found"});
    }
  
    const repository = {
        id, 
        title, 
        url, 
        techs, 
        likes:repositories[indexIdRepository].likes, 
    }; 

    repositories[indexIdRepository] = repository; 
    return response.status(200).json(repository); 

});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params; 
  
    const indexIdRepository = repositories.findIndex(repository => repository.id === id); 

    if (indexIdRepository >= 0) {
      repositories.splice(indexIdRepository,1); 
    }else{
      return response.status(400).send({error:"ID not found"}); 
    }
    return response.status(204).send(); 
   
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;  
  
  const indexIdRepository = repositories.findIndex(repository => 
      repository.id === id); 

  if (indexIdRepository === -1) {
    return response.status(400).json({error: 'Repository does not exists'});
  }
  repositories[indexIdRepository].likes += 1; 
  return response.status(200).json(repositories[indexIdRepository]); 

});

module.exports = app;
