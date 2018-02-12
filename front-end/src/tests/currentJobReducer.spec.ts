import { expect } from 'chai';
import 'mocha';
import { doneFetchingJobs, fetchingJobs, resetCurrentJob, setCurrentJob, singleJobSuccess } from '../actions/jobActions';
import { default as currentJobPostReducer } from '../reducers/currentJobReducer';
import { CurrentJobPost, Job } from '../types';

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

describe('CurrentJobPostReducer', () => {
  it('should return an empty CurrentJobPost', () => {
    expect(jobReducer(undefined, {})).eql(emptyJobPost);
  });

  it('fetchingJobs() should return with isFetching true', () => {
    expect(jobReducer(undefined, fetchingJobs())).eql({ ...emptyJobPost, isFetching: true });
  });

  it('doneFetchingJobs() should return with isFetching false', () => {
    expect(jobReducer(undefined, doneFetchingJobs())).eql({ ...emptyJobPost, isFetching: false });
  });

  it('singleJobSuccess should return with a job that matches our mockJob', () => {
    expect(jobReducer(undefined, singleJobSuccess(mockJob))).eql({ ...mockJob, isFetching: false });
  });

  it('resetCurrentJob should reset job to a blank job', () => {
    expect(jobReducer(mockJob, resetCurrentJob())).eql({ ...emptyJobPost, isFetching: false });
  });

  it('SET_CURRENT_JOB should return with a job that matches our mockJob', () => {
    expect(jobReducer(undefined, setCurrentJob(mockJob))).eql({ ...mockJob, isFetching: false });
  });

});
