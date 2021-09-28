const router = require("express").Router()
const User = require("../models/user")
const Post = require("../models/post")

// CREATE POST
router.post("/", async (req, res)=> {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, {new:true})
                res.status(200).json(updatePost)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("Hanya bisa update postingan sendiri")
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                await post.delete()
                res.status(200).json("post berhasil dihapus")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("Hanya bisa menghapus postingan sendiri")
        }
    } catch (error) {
        res.status(500).json(error)
    }
});


// GET POST BY ID
router.get("/:id", async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL POST
// GET ALL POST BY USERNAME
// GET ALL POST BY CATEGORY
router.get("/", async (req, res)=> {
    const username = req.query.user
    const category = req.query.cat
    try {
        let posts
        if(username){
            posts = await Post.find({username:username})
        } else if (category) {
            posts = await Post.find({
                categories:{
                    $in: [category],
                }
            })
        } else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router 