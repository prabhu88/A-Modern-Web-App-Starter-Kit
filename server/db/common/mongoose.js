const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// module.exports = {
//     connectToDb
// };
