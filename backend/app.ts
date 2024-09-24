import express from 'express';
import { Request, Response, NextFunction } from "express";
import cors from 'cors';
import taskRouter from './routes/taskRouter';

const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/tasks',taskRouter);

app.use((req, res, next) => {
    res.json({success: false, error: 'API NOT Found!'});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({success: false, error: err.message});
})

app.listen(3002, () => console.log('listening on 3002'));