const express = require('express');
const connectDB  = require('./utils/database');
const userRouter = require('./routes/userRouter');
const cookies = require('cookie-parser');
const profileRouter = require('./routes/profileRouter');
const requestRouter = require('./routes/requestRouter');
const feedRouter = require('./routes/feedRouter');
const cors = require('cors');
const http = require('http');
const instilizeSocket = require('./utils/socket');
const app = express();

const PORT = 9999;

app.use(cors({
    origin: "https://dev-tinder-nujf.vercel.app/",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.options("*", cors());

app.use(express.json());
app.use(cookies());

app.use('/', userRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', feedRouter);

const server = http.createServer(app);

instilizeSocket(server);

connectDB().then(()=>{
    console.log('connected to database');
    server.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
        
    })
}).catch((err)=>{
    console.log(err);
    
})

