// let express = require('express');

authCheck = (req, res, next) => {

	let token;

	if(req.header('Authorization')){
		//we only set this token once we verify the token is valid when the employee signs in.
		token = req.header('Authorization').split(' ')[1];
	}


	if(token){
		next();
	}else{
		res.status(400).send({error: 'need auth'});
	}
};

module.exports = authCheck;
