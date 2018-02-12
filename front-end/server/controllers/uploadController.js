//===========================================
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;
const accessKeyId =  process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	region: 'us-east-1'
});

let s3 = new AWS.S3();

const uploadPath = path.join(__dirname, '../..', '/public/uploads/images');

console.log('uploadPath:', uploadPath);
let storageType = {};
/**
 * If we are in prod we want to use s3 storage for files, if not we save files locally
 */
if(process.env.NODE_ENV !== 'development'){
	storageType = multerS3({
		s3: s3,
		bucket: S3_BUCKET,
		acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
		key: function (req, file, cb) {
			console.log("in multer options with:", file);
			let ext = path.extname(file.originalname);
			let newFileName = `${Math.random().toString(36).substring(7)}${ext}`;
			let fullPath = 'uploads/images/'+ newFileName;
			cb(null, fullPath);
		}
	});
} else {
	console.log("we're in dev mode so we're uploading locally");
	storageType = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, uploadPath)
		},
		filename: function (req, file, cb) {
			let ext = path.extname(file.originalname);
			cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
		}
	})
}


const upload = multer({
	fileFilter: function (req, file, next) {
		"use strict";
		const isPhoto = file.mimetype.startsWith('image/');
		if (isPhoto) {
			console.log("it is a photo, upload");
			next(null, true);
		} else {
			console.log("it is NOT a photo");
			// next({message: "That filetype isn't allowed"}, false);
		}

		console.log("it was something else:");
		next(null, true);
	},
	storage: storageType
});

module.exports = upload;
//===========================================