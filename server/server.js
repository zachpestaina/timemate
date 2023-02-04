const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();

//setting up your port
const PORT = process.env.PORT || 8080;

const loginRouter = require('./routes/login');

//synchronizing the database and forcing it to false so we dont lose data
// db.sequelize.sync().then(() => {
//   console.log('db has been re sync');
// });

app.use('/', loginRouter);

/**
 *
 * @see I DONT UNDERSTAND THIS
 */
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

/**
 ***************
 */

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

module.exports = app;
