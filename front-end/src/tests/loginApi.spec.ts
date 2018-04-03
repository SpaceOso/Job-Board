import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as app from '../../app';
import { companyKeys } from './jobApi.spec';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:4200';

describe('/api/login/', () => {

  it('should POST employee credentials and return logged in employee', (done) => {
    const employeeDetails = {
      email: 'testemployee@gmail.com',
      password: '123',
    };
    const employeeKeys = ['id', 'firstName', 'lastName', 'email', 'companyId'];

    chai.request(url)
      .post('/login')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.all.keys(['employee', 'company', 'token']);
        expect(res.body.company).to.have.all.keys(companyKeys);
        expect(res.body.employee).to.have.all.keys(employeeKeys);
        expect(res.body.token).to.be.a('string');
        // TODO need to test employee that does not have an company saved
        // console.log(res.body);
        done();
      });

  });

  it('should POST with wrong credentials and return an error message', (done) => {
    const wrongCredentials = {
      email: 'noemployeefound@gmail.com',
      password: '12345',
    };

    const errorMessage = 'Username or password not valid';
    chai.request(url)
      .post('/login')
      .send(wrongCredentials)
      .end((err, res) => {
        res.should.have.status(500);
        expect(res.body).to.have.key('message');
        expect(res.body.message).to.eql(errorMessage);
        done();
      });

  });

  it('should POST with employee who does not have an company registered', (done) => {
    const employeeDetails = {
      email: 'nocompany@gmail.com',
      password: '123',
    };
    chai.request(url)
      .post('/login')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.all.keys(['employee', 'company', 'token']);
        done();
      });
  });
});
