const mongoose = require('mongoose')
// Use Mongoose to connect to your MongoDB database in your application. Create a connection file, e.g., db.js:
mongoose.connect(`mongodb+srv://dianaponce:Oh3F0AGzG9Z2Y0SH@cluster0.dplol97.mongodb.net/?retryWrites=true&w=majority`,{
    userNewUrlParser: true,
    useUnifiedTopology: true
})

mondule.exports = mongoose.connection
// got this from mongodb 