import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as app from '../../app';
import { employerKeys } from './jobApi.spec';
import { CurrentJobPost, Job } from '../types'

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:4200';

describe('/employer', () => {

  it('should POST a NEW JOB', (done) => {
    const jobDetails = {
      title: 'chai job',
      city: 'palmdale',
      state: 'CA',
      zip: '93550',
      description: 'a chai test job',
      employerId: '76d743f0-05a2-11e8-8a62-509a4c1c45f2',
    };

    const jobKeys = ['title', 'location', 'description', 'id', 'employerId', 'updatedAt', 'createdAt', 'Applicants'];
    const locationKeys = ['city', 'state', 'zip'];

    chai.request(url)
      .post('/employer/createJob')
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer 596f8b8c63da28213c4bf061')
      .send(jobDetails)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body).to.have.all.keys(jobKeys);
        expect(res.body.location).to.have.all.keys(locationKeys);
        done();
      });

  });
});
