import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import possessionRoutes from './routes/possession.js';
import patrimoineRoutes from './routes/patrimoine.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/possession', possessionRoutes);
app.use('/patrimoine', patrimoineRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
