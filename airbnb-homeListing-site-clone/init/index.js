const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing= require("../models/listing.js");


// mongodb database connection code
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

// link data.js and initializing  all data
const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj) => ({
        ...obj,
        owner: "68f973f81267fd4a0f60877e"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();

