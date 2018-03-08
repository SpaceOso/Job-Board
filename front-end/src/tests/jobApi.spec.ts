import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as app from '../../app';
import { default as currentJobPostReducer } from '../reducers/currentJobReducer';
import { Job } from '../types';

const should = chai.should();
const expect = chai.expect;

const emptyJobPost = {
  id: '',
  title: '',
  description: '',
  employerId: '',
  isFetching: false,
  createdAt: '',
  location: {
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  Employer: {
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

const mockJob: Job = {
  createdDate: '12/12/12',
  description: 'Mock Test Job',
  employer: {
    facebook: 'facebook.com',
    id: '1234345',
    linkedIn: 'linked.com',
    address: {
      street: '602 mock street',
      city: 'New York',
      state: 'mock state',
      zip: '123456',
    },
    logoImg: null,
    name: 'mock employer',
    twitter: 'twitter.com',
    website: 'www.mock.com',
  },
  employerId: 'employer1234',
  id: '1234556',
  address: {
    street: '6092 job mock street',
    city: 'mock city job',
    state: 'mock state',
    zip: '1234556',
  },
  title: 'mock job title yo',
};

chai.use(chaiHttp);

const url = 'http://localhost:4200';
const jobKeys = ['id', 'title', 'location', 'description', 'createdAt', 'updatedAt', 'employerId', 'Employer'];
export const employerKeys = ['id', 'name', 'location', 'logoImg', 'website', 'twitter', 'facebook', 'linkedIn', 'createdAt', 'updatedAt'];

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
            expect(job.Employer).to.have.all.keys(employerKeys);
          });
        }
        done();
      });
  });

 /* it('should GET a SINGLE job', (done) => {
    chai.request(url)
      .get('/api/v1/jobposts/12312312-1234-1234-1234-123412341234')
      .end((err, res) => {
        const singleJobKey = ['id', 'name', 'street', 'logoImg', 'website', 'twitter', 'facebook', 'linkedIn', 'createdAt', 'updatedAt', 'jobs'];
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.all.keys(jobKeys);
        expect(res.body.Employer).to.have.all.keys(singleJobKey);
        res.body.Employer.jobs.should.be.a('array');
        done();
      });
  });*/

});
