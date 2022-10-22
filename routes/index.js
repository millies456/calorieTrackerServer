const express = require('express');
const app = express();
const fs = require('fs');
const Joi = require('joi');

app.use(express.json()); //adding "middleware"

//an array of course objects with 2 attributes each
const courses = [
  {id: 367, name: 'math'},
  {id: 418, name: 'software engineering'},
  {id: 410, name: 'databases'},
  {id: 499, name: 'capstone'},
];


////////////////////////////////// GET ROUTE HANDLERS ///////////////////////////////////////


//"route handler function"
//first arg = path or URL
//second arg = call back function
app.get('/', function(req, res) {
  res.send('Hello w0rld');
});

//send our courses array
app.get('/api/courses', (req, res) => {
  res.send(courses);
})

//checks the courses array to find one with matching id, request was made as a string so parseInt
app.get('/api/courses/:id', (req, res) =>{
  const course=courses.find(c=> c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('404!!! course with given id was not found'); //404 means object not found
  res.send(course);
})

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
})

////////////////////////////////// POST ROUTE HANDLERS ///////////////////////////////////////


app.post('/api/courses', (req, res)=> {
  const schema ={
    name: Joi.string().min(3).required()
  };

  const result = Joi.valid(req.body, schema);
  console.log(result);

  if(result.error()) {
    //400 means Bad request
    res.status(400).send('oopsie');
  }

  const course = {
   id: courses.length+1,
   name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// app.post('/api/food/makeFile', (req, res)=>{
//   fs.appendFile('oopsies.txt', 'Hello pizz!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });
// });

////////////////////////////////// PUT ROUTE HANDLERS ///////////////////////////////////////

app.put('/api/courses/:id', (req, res) =>{
  //look up the course
  // if course doesn't exist, return 404

  //validate the course,
  //if invalid, return 400 = Bad request

  //update course
  //return updated course to the client
});






const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port: ${port}`) )

module.exports = app;
