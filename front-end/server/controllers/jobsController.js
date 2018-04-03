const Job = require('../models').Job;
const Company = require('../models').Company;

module.exports = {

	list(req, res) {
		"use strict";
		return Job
			.findAll({
				include: [Company],
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
					model: Company
				}]
			})
			.then((job) => {
				job.Company.getJobs()
					.then(companyJobs => {
						job.dataValues.Company.dataValues.jobs = companyJobs;
						res.status(200).send(job.dataValues);
					})

			})
			.catch((error) => {
				res.status(401).send(error)
			});
	}
};

