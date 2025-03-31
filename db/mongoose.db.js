const mongoose = require("mongoose")
mongoose.connect(process.env.DB_Connection)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((error)=>{"Error to connect",error})