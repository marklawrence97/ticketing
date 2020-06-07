import express from 'express';
import { json } from 'body-parser';
import "express-async-errors";
import mongoose from 'mongoose';
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";


const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);


app.get('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
};

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});