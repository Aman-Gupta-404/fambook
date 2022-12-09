import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/user.js"
import authRoute from "./routes/auth.js"

const app = express();
dotenv.config()

app.use('/Images', express.static('Images'))
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoute);


// connection URL: mongodb+srv://Aman_Gupta:Aman2001@cluster0.uluvlcy.mongodb.net/?retryWrites=true&w=majority
const CONNECTION_URL = process.env.MONGODBURL;
const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

// connecting to the mongoose
mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}...`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
