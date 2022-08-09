import express from 'express';
import {router as crudController} from "./controller/curd.controller.js"

const app = express();

app.use("/posts",crudController);

export default app;