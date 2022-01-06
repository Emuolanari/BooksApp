const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config({ path: './config.env' })

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});