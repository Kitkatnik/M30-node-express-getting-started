const express = require('express');
const morgan = require('morgan');

const app = express();

module.exports = app;

const sayHello = ( req, res, next ) => {
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello ${name}` : 'Hello!';
    res.send(content);
}

const saySomething = ( req, res, next ) => {
    const greeting = req.params.greeting;
    const name = req.query.name;

    const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
    res.send(content);
}
const sayGoodbye = (req, res, next) => {
    res.send("Sorry to see you go!")
}

const notFound = ( req, res, next) => {
    res.send(`The route ${req.path} does not exist`);
}

const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.send(err);
}

app.use(morgan('dev'));
app.get('/hello', sayHello);
app.get("/say/goodbye", sayGoodbye);
app.get("/say/:greeting", saySomething);
app.get("/states/:abbreviation", (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    if (abbreviation.length !== 2) {
      next("State abbreviation is invalid.");
    } else {
      res.send(`${abbreviation} is a nice state, I'd like to visit.`);
    }
  });
app.use(notFound);
app.use(errorHandler);

module.exports = app;