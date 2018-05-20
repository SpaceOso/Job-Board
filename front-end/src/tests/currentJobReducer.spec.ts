import {expect} from 'chai';
import 'mocha';
import {doneFetchingJobs, fetchingJobs, resetCurrentJob, setCurrentJob, singleJobSuccess} from '../actions/jobActions';
import {default as currentJobPostReducer} from '../reducers/currentJobReducer';
import {JobPost} from '../types';

const emptyJobPost: JobPost = {
  isFetching: false,
  job: {
    id: '',
    title: '',
    description: '',
    companyId: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    createdDate: null,
  },
  company: {
    id: '',
    name: '',
    applicantList: null,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    linkedIn: null,
    facebook: null,
    logoImg: null,
    twitter: null,
    website: null,
    jobs: null,
    isFetching: false,
  },
};
const jobReducer = currentJobPostReducer;

const mockJob: JobPost = {
  isFetching: false,
  job: {
    createdDate: "tester",
    id: '1234556',
    title: 'mock jobPost title yo',
    description: 'Mock Test Job',
    address: {
      street: '6092 jobPost mock street',
      city: 'mock city jobPost',
      state: 'mock state',
      zipCode: '1234556',
    },
    companyId: 'company1234',
  },
  company: {
    isFetching: false,
    applicantList: null,
    facebook: 'facebook.com',
    id: '1234345',
    linkedIn: 'linked.com',
    address: {
      street: '602 mock street',
      city: 'New York',
      state: 'mock state',
      zipCode: '123456',
    },
    logoImg: null,
    name: 'mock company',
    twitter: 'twitter.com',
    website: 'www.mock.com',
    jobs: null,
  },
};

describe('CurrentJobPostReducer', () => {
  it('should return an empty CurrentJobPost', () => {
    expect(jobReducer(undefined, {})).eql(emptyJobPost);
  });

  it('fetchingJobs() should return with isFetching true', () => {
    expect(jobReducer(undefined, fetchingJobs())).eql({...emptyJobPost, isFetching: true});
  });

  it('doneFetchingJobs() should return with isFetching false', () => {
    expect(jobReducer(undefined, doneFetchingJobs())).eql({...emptyJobPost, isFetching: false});
  });

  it('singleJobSuccess should return with a jobPost that matches our mockJob', () => {
    expect(jobReducer(undefined, singleJobSuccess(mockJob))).eql({...mockJob, isFetching: false});
  });

  it('resetCurrentJob should reset jobPost to a blank jobPost', () => {
    expect(jobReducer(mockJob, resetCurrentJob())).eql({...emptyJobPost, isFetching: false});
  });

  it('SET_CURRENT_JOB should return with a jobPost that matches our mockJob', () => {
    expect(jobReducer(undefined, setCurrentJob(mockJob))).eql({...mockJob, isFetching: false});
  });

});
