const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('./config/db');
const app = require('./app');

const port = process.env.PORT || 5000;

// Connect to Database and start server
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at port : ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
