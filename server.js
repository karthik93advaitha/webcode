const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs'); //key value pairs
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('curYear', ()=>{
  return new Date().getFullYear();
});
app.use( express.static(__dirname + '/public'));

app.use( (req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page',
//   });
// });

app.get('/', (request , response) =>{
  //response.send('Hello welcome to this node app on express server');
 // response.send({
 //   Name: 'karthik',
 //   Age: 24,
 //   Interests: ['photography',
 //                'cooking',
 //                'football',
 //                'TT']
 // });
response.render('home.hbs',{
  pageTitle: 'Home Page',
  welcomeMessage: 'Hello welcome'

});
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'

  });
});

app.get('/help', (req,res)=>{
  res.render('help.hbs',{
    pageTitle: 'Help Page',

  });
});


app.get('/bad', (req,res)=>{
  res.send({
    ErrorMessage: 'could not get the data',
    Status: 404
  });
});

app.listen(port, ()=>{
  console.log(`server started on port ${port}`);
});
