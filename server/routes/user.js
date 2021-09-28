const router = require("express").Router()
const User = require("../models/user")
const Post = require("../models/post")
const bcrypt = require('bcrypt')

// UPDATE
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }   
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },{new:true})
            res.status(200).json(updateUser)
        } catch (err) {
          res.status(500).json(err);
        }
    } else {
        res.status(401).json("update data hanya diijinkan pada akun anda")
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        // menghapus seluruh data akun (termasuk artikel yang dikirim)
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User telah dihapus")
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (error) {
            res.status(404).json("User tidak ditemukan")
        }
    } else {
        res.status(401).json("Hanya boleh menghapus akun anda!")
    }
});

// GET USER
router.get("/:id", async (req, res)=> {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router 