const { response, request } = require("express");

const Post = require("../models/posts");

const getPosts = async (req = request, res = response) => {
	const query = { state: true };
    try {    
        const posts = await Post.find(query).populate('user');
        res.json({
            posts,
            success: true
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error',
            success: false
        });
    }
};

const updatePost = async (req, res = response) => {
	const { id } = req.params;
	const { _id, ...resto } = req.body;

	try {
		const post = await Post.findByIdAndUpdate(id, resto, {new: true});
		res.json({
			success: true,
			post
		});
	} catch (err) {
		res.status(400).json({
			msg: 'Error al actualizar la publicación',
			err
		});
	}
}

const getPost = async (req, res = response) => {
	const { id } = req.params;
	try {		
		const post = await Post.findById(id).populate({
			path: 'comments',
			populate: {
				path: 'user',
			}
		});
		res.json({
			success: true,
			post
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: 'Error al buscar la publicación'
		})
	}
};

const createPost = async (req, res = response) => {
	const { title, desc, date, user, img } = req.body;
	
	try {
		
		const post = new Post({ title, desc, date, user, img });
		await post.save();
		const postPopulated = await Post.findById(post._id).populate('user');
		
		res.status(201).json({
			success: true,
			post: postPopulated
		})
	} catch (err) {
		console.log(err);
		res.status(400).json({
			msg: 'Error al guardar la publicación',
			err
		});
	}
};

const deletePost = async (req, res = response) => {
	const { id } = req.params;

	try {
		const post = await Post.findByIdAndUpdate(id, { state: false });
		res.json({
			success: true,
			post
		});
	} catch (err) {
		res.status(400).json({
			msg: 'Error al eliminar la publicación',
			err
		});
	}
};


module.exports = {
	getPost,
	getPosts,
    createPost,
	updatePost,
	deletePost,
};