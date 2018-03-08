import {expect} from 'chai';
import 'mocha';
import {doneFetchingJobs, fetchingJobs, resetCurrentJob, setCurrentJob, singleJobSuccess} from '../actions/jobActions';
import {default as currentJobPostReducer} from '../reducers/currentJobReducer';
import employerReducer from '../reducers/employerReducer';
import {CurrentJobPost, Employer, Job} from '../types';

const emptyJobPost: CurrentJobPost = {
    id: '',
    title: '',
    description: '',
    employerId: '',
    isFetching: false,
    createdDate: null,
    address: {
        street: '',
        city: '',
        state: '',
        zip: '',
    },
    employer: {
        id: '',
        name: '',
        address: {
            street: '',
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
    createdDate: {
        dayOfMonth: 0,
        dayOfWeek: '',
        dayOfYea: 0,
        month: '',
        year: 0,
        monthValue: 0,
        hour: 0,
        minute: 0,
        nano: 0,
        second: 0,
        chronology: {
            id: '',
            calendarType: ''
        }
    },
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
    isFetching: false,
};
const mockEmployer: Employer = {
    id: '',
    name: '',
    address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
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
