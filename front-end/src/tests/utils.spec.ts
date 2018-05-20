import {expect} from 'chai';
import 'mocha';
import {JobPost} from "../types";

describe('Hello function', () => {
  it('should return Hello World', () => {
    const result = 'Hello Rico';
    expect(result).to.equal('Hello Rico');
  });
});

export const emptyJobPost: JobPost = {
  isFetching: false,
  job: {
    id: '',
    title: '',
    description: '',
    companyId: '',
    createdDate: null,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  company: {
    id: '',
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    linkedIn: null,
    applicantList: null,
    facebook: null,
    logoImg: null,
    twitter: null,
    website: null,
    isFetching: false,
    jobs: null,
  },
};

export const mockJob: JobPost = {
  isFetching: false,
  job: {
    createdDate: "sometimes",
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
