import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        console.log("Accessed psot message")
        const postMessage = await PostMessage.find({}).exec();
        res.status(200).json({
            error: false,
            posts: postMessage
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: "Internal server error"
        })
    }
}

export const getMyPosts = (req, res) => {
    const userId = req.params.userId;
    // find the specific users post
    PostMessage.find({ creatorId: userId }, function (err, docs) {
        if(err) {
            return res.status(400).json({
                error: true,
                message: "some server error in fetching data!"
            })
        }
        return res.status(200).json({
            error: false,
            postData: docs
        })
    });
}

export const createPosts = async (req, res) => {
    try {
        console.log("creating new")
        // getting the image file
        let image = (req.file) ? req.file.filename : null
        console.log("files: ", req.files)
        console.log("file: ", req.file)
        // get the user data for creating the post
        const reqData = req.body;
        console.log("creating object")
        const post = {
            title: reqData.title,
            message: reqData.message,
            creator: reqData.creator,
            creatorId: reqData._id,
            tags: reqData.tags,    //array of tags
            selectedFile: image,
            likeUserList: [],
            likeCount: 0,
        }
        // console.log(post)
        const newPost = await new PostMessage(post)

        try {
            const result = newPost.save();
            res.status(201).json({
                error: false,    
                result: result,
            })
        } catch (error) {
            console.log(error)
            res.status(409).json({
                error: true,
                message: error.message
            })
        }    
    } catch (error) {
        console.log(error)
        res.status(404).json({
            error: true,
            message: "Internal server error!"
        })
    }
    
}

// to like post
export const likePost = async (req, res) => {
    try {
        // const likeUserArr = req.body.user_id;
        const postId = req.params.postId;
        const userId = req.params.userId;
        const likeUserArr = req.body.likeUserArr;
        const likeCount = req.body.likeCount;
        
        PostMessage.findByIdAndUpdate(postId, { likeUserList: [...likeUserArr], likeCount: likeCount}, function(updatedPost) {
            console.log("update done");
        })

        return res.send("check console!");

    } catch (error) {
        res.status(401).json({
            error: true,
            message: "Internal server error!"
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        // get post ID by params
    const productId = req.params.productId;

    // find by ID, 
    PostMessage.findByIdAndDelete(productId)
        .then(res => {
            return res.status(200).json({
                error: false,
                message: "The post has been deleted"
            })
        })    
    } catch (error) {
        return res.status(401).json({
            error: true,
            message: "Internal server error!"
        })
    }
    
}