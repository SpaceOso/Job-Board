import { expect } from 'chai';
import 'mocha';
import { doneFetchingJobs, fetchingJobs, resetCurrentJob, setCurrentJob, singleJobSuccess } from '../actions/jobActions';
import { default as currentJobPostReducer } from '../reducers/currentJobReducer';
import employerReducer from '../reducers/employerReducer';
import { CurrentJobPost, Employer, Job } from '../types';

const emptyJobPost: CurrentJobPost = {
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

const mockJob: CurrentJobPost = {
  createdAt: '12/12/12',
  description: 'Mock Test Job',
  Employer: {
    facebook: 'facebook.com',
    id: '1234345',
    linkedIn: 'linked.com',
    location: {
      address: '602 mock street',
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
  location: {
    address: '6092 job mock street',
    city: 'mock city job',
    state: 'mock state',
    zip: '1234556',
  },
  title: 'mock job title yo',
  isFetching: false,
};
const mockEmployer: Employer = {
  id: '',
  name: '',
  location: {
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  logoImg: '',
  website: '',
  twitter: '',
  facebook: '',
  linkedIn: '',
  jobs: null,
  isFetching: false,
};

describe('Employer Reducer', () => {
  it('should RETURN an empty employer', () => {
    expect(employerReducer(undefined, {})).eql(mockEmployer);
  });
});
