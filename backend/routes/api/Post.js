const express = require('express')
const router = express.Router()
const requireLogin = require('../../middleware/requireLogin');
// const { populate } = require('../../models/Post');
const Post = require('../../models/Post')


// show all post 

router.get('/allpost', requireLogin, (req, res) => {

    Post.find()
        .populate("postedBy", "_id name avatar date")
        .then(showallpost => {
            res.json({ showallpost });
        })
        .catch(err => {
            console.log(err);
        })
});



// createpost
router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body
    if (!title || !body || !pic)
    {
        res.status(422).json({ error: "please fill all required fields" })
    }
    else
    {
        const post = new Post({
            title,
            body,
            photo: pic,
            postedBy: req.user
        })
        post.save().then(postSavedByUser => {

            res.json({ post: postSavedByUser })

        })
    }

})



// my post
// router.get('/mypost', (req, res) => {
//     Post.find({ postedBy: req.user._id })
//         .populate("PostedBy", "_id name")
//         .then(mypost => {
//             // res.json({ mypost })
//             console.log(mypost);
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })


router.get('/mypost', requireLogin, (req, res) => {

    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name avatar date")
        .then(showallpost => {
            res.json({ showallpost });
        })
        .catch(err => {
            console.log(err);
        })
});
// joshua

module.exports = router