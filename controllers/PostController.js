import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find()
			.populate({ path: 'user', select: ['fullName', 'avatarUrl'] })
			.exec();

		res.json(posts);
	} catch (err) {
		res.status(500).json({
			message: 'Failed to get posts',
		});
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			}
		)
			.then((doc) => {
				if (!doc) {
					return res.status(404).json({
						message: 'Article not found',
					});
				}

				res.json(doc);
			})
			.catch((err) => {
				if (err) {
					console.log(err);

					return res.status(500).json({
						message: 'Error return article',
					});
				}
			});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to get posts',
		});
	}
};

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;

		PostModel.findByIdAndDelete({
			_id: postId,
		})
			.then((doc) => {
				if (!doc) {
					return res.status(404).json({
						message: 'Article not found',
					});
				}

				res.json({
					success: true,
				});
			})
			.catch((err) => {
				if (err) {
					console.log(err);

					return res.status(500).json({
						message: 'Error delete article',
					});
				}
			});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Failed to get posts',
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			user: req.userId,
		});

		const post = await doc.save();

		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Unable to create a post',
		});
	}
};

export const update = async (req, res) => {
	try {
		const postId = req.params.id;

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				tags: req.body.tags,
				user: req.userId,
			}
		);

		res.json({
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Unable to update a post',
		});
	}
};
