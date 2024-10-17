const express = require('express');
const authRouter = require('./routes/auth.route');
const uploadImageRouter = require('./routes/uploadImage.route');
const app = express();
const cors = require('cors');
const { port, MONGODB_URL } = require('./config/server.config');
const { connectDB } = require('./db/connect');
app.use(cors());
app.use(express.json());
app.use('/api', authRouter);
app.use('/api', uploadImageRouter);


async function serverStart() {

    try {
        await connectDB(MONGODB_URL);
        console.log("Database connected successfully");

        app.listen(port, () => {
            console.log('Server is running on port ' + port);

        });
    }
    catch (error) {
        console.error(error);
    }

}

serverStart();