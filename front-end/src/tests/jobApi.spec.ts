import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as app from '../../app';
import {default as currentJobPostReducer} from '../reducers/currentJobReducer';
import {Job, JobPost} from '../types';

const should = chai.should();
const expect = chai.expect;

const emptyJobPost = {
    id: '',
    title: '',
    description: '',
    companyId: '',
    isFetching: false,
    createdAt: '',
    location: {
        address: '',
        city: '',
        state: '',
        zip: '',
    },
    company: {
        id: '',
        name: '',
        location: {
            address: '',
            city: '',
            state: '',
            zip: '',
        },
        linkedIn: null,
        facebook: null,
        logoImg: null,
        twitter: null,
        website: null,
    },
};
const jobReducer = currentJobPostReducer;


chai.use(chaiHttp);

const url = 'http://localhost:4200';
const jobKeys = ['id', 'title', 'location', 'description', 'createdAt', 'updatedAt', 'companyId', 'company'];
export const companyKeys = ['id', 'name', 'location', 'logoImg', 'website', 'twitter', 'facebook', 'linkedIn', 'createdAt', 'updatedAt'];

describe('/api/v1/jobposts/', () => {

    it('should GET all the jobs', (done) => {
        chai.request(url)
            .get('/api/v1/jobposts/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');

                if (res.body.length > 0) {
                    res.body.map((job) => {
                        expect(job).to.have.all.keys(jobKeys);
                        expect(job.company).to.have.all.keys(companyKeys);
                    });
                }
                done();
            });
    });


});
