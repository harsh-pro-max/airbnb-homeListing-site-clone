const express = require("express");
const app = express();
const mongoose= require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// root route
app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});

// index route creating
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
});

// new route creating
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

// show route creating
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// create Route
app.post("/listings",async (req,res)=>{
    //let {title,description,image,price,country,locaiton}= req.body;
    const newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit route creating
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// Update Route creating
app.put("/listings/:id", async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

// delete route creating
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deleteLisings = await Listing.findByIdAndDelete(id);
    console.log(deleteLisings);
    res.redirect("/listings");
});



//test route
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"sunset ray in my house",
//         description:"By the beach",
//         price: 3000,
//         location: "Calanguta, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful");
// });


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})