import {expect} from 'chai';
import 'mocha';
import {doneFetchingJobs, fetchingJobs, resetCurrentJob, setCurrentJob, singleJobSuccess} from '../actions/jobActions';
import {default as currentJobPostReducer} from '../reducers/currentJobReducer';
import {CurrentJobPost, Job} from '../types';

const emptyJobPost: CurrentJobPost = {
    id: '',
    title: '',
    description: '',
    employerId: '',
    isFetching: false,
    address: {
        street: '',
        city: '',
        state: '',
        zip: '',
    },
    createdDate: null,
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

    it('singleJobSuccess should return with a job that matches our mockJob', () => {
        expect(jobReducer(undefined, singleJobSuccess(mockJob))).eql({...mockJob, isFetching: false});
    });

    it('resetCurrentJob should reset job to a blank job', () => {
        expect(jobReducer(mockJob, resetCurrentJob())).eql({...emptyJobPost, isFetching: false});
    });

    it('SET_CURRENT_JOB should return with a job that matches our mockJob', () => {
        expect(jobReducer(undefined, setCurrentJob(mockJob))).eql({...mockJob, isFetching: false});
    });

});
