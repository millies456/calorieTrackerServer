const express = require('express');
const app = express();
const fs = require('fs');
const Joi = require('joi');

app.use(express.json()); //adding "middleware"

//an array of course objects with 2 attributes each
const courses = [
  {id: 1, name: 'pizza'},
  {id: 2, name: 'salad'},
  {id: 3, name: 'ice cream'},
  {id: 4, name: 'apples'},
];


////////////////////////////////// GET ROUTE HANDLERS ///////////////////////////////////////


//"route handler function"
//first arg = path or URL
//second arg = call back function
app.get('/', function(req, res) {
  res.send('Hello world');
});

//send our courses array
app.get('/api/foods', (req, res) => {
  res.send(courses);
})

//checks the courses array to find one with matching id, request was made as a string so parseInt
app.get('/api/foods/:id', (req, res) =>{
  const course=courses.find(c=> c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('404!!! course with given id was not found'); //404 means object not found
  res.send(course);
})

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
})

////////////////////////////////// POST ROUTE HANDLERS ///////////////////////////////////////


app.post('/api/foods', (req, res)=> {
  // const {error} = validateCourse(req.body);
  // if(error) {
  //   res.status(400).send('post oopsie');
  // }
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

app.put('/api/foods/:id', (req, res) =>{
  //console.log(req.params.id);
  const course=courses.find(c=> c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('404!!! course with given id was not found'); //404 means object not found

  //validate the course,
  //if invalid, return 400 = Bad request

 // const result = validateCourse(req.body);

  //"object destructuring"
  //const {error} = validateCourse(req.body);
  // if(error) {
  //   res.status(400).send(`put oopsie ${req.params.id}`);
  // }

  //update course
  course.name = req.body.name;

  //return updated course to the client
  res.send(course.name);
});






/////////////////////////// DELETE ROUTE HANDLERS ////////////////////////////////////

app.delete('/api/foods/:id', (req, res) => {
  //look up course
  const course=courses.find(c=> c.id === parseInt(req.params.id));
  //if not there => return 404
  if(!course) res.status(404).send('404!!! course with given id was not found'); //404 means object not found


  //else delete it
  const index = courses.indexOf(course);
  courses.splice(index, 1);//seems like there's 10 other ways to delete this object, here's one way

  //return the course that was deleted to client
  res.send(course);
});



function validateCourse(course){
  const schema ={
    name: Joi.string().min(3).required()
  };
  return result= Joi.valid(course, schema);
}


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port: ${port}`) )

module.exports = app;
