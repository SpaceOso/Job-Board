// let express = require('express');

authCheck = (req, res, next) => {

	console.log('inside the auth check');
	let token;

	if(req.header('Authorization')){
		console.log('there was a header');
		//we only set this token once we verify the token is valid when the employee signs in.
		token = req.header('Authorization').split(' ')[1];
	}


	if(token){
		next();
	}else{
		console.log('there was not a header');
		res.status(400).send({error: 'need auth'});
	}
};

module.exports = authCheck;