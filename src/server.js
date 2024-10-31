require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();

const path = require('path');


const PORT = process.env.PORT || 3000;


const MONGODB_URL=process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(MONGODB_URL).then( ()=>{
    console.log("Database Connected succesfully");
    app.listen(PORT,()=>{
        console.log(`Server running on http://localhost:${PORT}`);

    });
})
.catch((error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', userRoutes);


// Serve the User List HTML as the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/displayUsers.html'));
});