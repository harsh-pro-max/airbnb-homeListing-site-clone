const express = require("express");
const router = express.Router();


// for posts route creating
// Index - posts
router.get("/",(req,res)=>{
    res.send("Get for posts");
});

// Show - posts
router.get("/:id",(req,res)=>{
    res.send("Get for show posts id");
});

// post - posts
router.post("/",(req,res)=>{
    res.send("Post req for posts ");
});

// Show - posts
router.get("/:id",(req,res)=>{
    res.send("Get for show posts");
});

// DELETE - posts
router.delete("/:id",(req,res)=>{
    res.send("Delete for posts");
});

module.exports = router;