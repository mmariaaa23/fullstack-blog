import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'unvalid format of email!!').isEmail(),
	body('password', 'password should be longer than 5 symbols!!!').isLength({
		min: 5,
	}),
	body('fullName', 'write your name!!').isLength({ min: 3 }),
	body('avatarUrl', 'unvalid link to the avatar').optional().isURL(),
];

export const loginValidation = [
	body('email', 'unvalid format of email!!').isEmail(),
	body('password', 'password should be longer than 5 symbols!!!').isLength({
		min: 5,
	}),
];

export const postCreateValidation = [
	body('title', 'Insert the name of the article')
		.isLength({ min: 3 })
		.isString(),
	body('text', 'Insert the text of the article')
		.isLength({ min: 3 })
		.isString(),
	body('tags', 'Incorrect format of the tags(insert an array)')
		.optional()
		.isArray(),
	body('imageUrl', 'Unvalide link to the picture').optional().isString(),
];
