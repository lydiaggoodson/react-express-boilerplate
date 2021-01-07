import { join } from 'path';
import express from 'express';
import router from './routes/api';

const CLIENT_PATH = join(__dirname, '../../client');
require('dotenv').config()

const app = express();

app.use(express.static(CLIENT_PATH));
app.use(express.json());

app.use('/api', router);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
