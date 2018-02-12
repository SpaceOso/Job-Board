const Job = require('../models').Job;
const Employer = require('../models').Employer;

module.exports = {

	list(req, res) {
		"use strict";
		return Job
			.findAll({
				include: [Employer],
				order: [['createdAt', 'DESC']]
			})
			.then((jobs) => {
				res.status(200).send(jobs);
			})
			.catch((error) => {
				res.status(404).send(error)
			});
	},

	getById(req, res) {
		"use strict";
		return Job
			.findById(req.params.jobId, {
				include: [{
					model: Employer
				}]
			})
			.then((job) => {
				job.Employer.getJobs()
					.then(employerJobs => {
						job.dataValues.Employer.dataValues.jobs = employerJobs;
						res.status(200).send(job.dataValues);
					})

			})
			.catch((error) => {
				res.status(401).send(error)
			});
	}
};

