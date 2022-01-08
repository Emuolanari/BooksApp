const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config({ path: './config.env' })

const app = require('./app');
const db = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(db, {
    useNewUrlParser: true
}).then(console.log('connected to database'));

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});