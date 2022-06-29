require('dotenv').config();
require('express-async-errors');

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

//Db Connection
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

//routers
const authRouter = require('./routes/auth')
//const jobsRouter = require('./routes/jobs')
const productsRouter = require('./routes/products')
const upsRouter = require('./routes/ups')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


const url = require('url')
const path = require("path");

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

//invoke middleware
app.use(express.json());

//middleware for security
app.set('trust proxy', 1)

//Uncomment during production
app.use(rateLimiter({
  windowMs: 15*60*1000,//15 minutes
  //max: 100, //limit each IP to 100 requests per windowMs
}))
helmet({
    contentSecurityPolicy: false,
  })
const corsOptions = require('./config/corsOptions')

//used for cors issues during production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//app.use(cors(corsOptions))
app.use(cors())
app.use(xss())

// routes
app.use('/api/v1/auth', authRouter)
//app.use('/api/v1/jobs', authenticateUser, jobsRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/ups', upsRouter)

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //console.log(path.resolve(__dirname, "./client/src", "App.js"))
    // app.use(express.static(path.resolve(__dirname, "/client/src")));
    // app.get("*", function (request, response) {
    //   response.sendFile(path.resolve(__dirname, "./client/src", "App.js"));
    // });
  
    
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
