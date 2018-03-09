import { expect } from 'chai';
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
    job:{
        id: '',
        title: '',
        description: '',
        employerId: '',
        createdDate: null,
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
    },
    employer: {
        id: '',
        name: '',
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
        isFetching: false,
        jobs: null,
    },
};

export const mockJob: JobPost = {
    isFetching: false,
    job: {
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
        id: '1234556',
        title: 'mock jobPost title yo',
        description: 'Mock Test Job',
        address: {
            street: '6092 jobPost mock street',
            city: 'mock city jobPost',
            state: 'mock state',
            zipCode: '1234556',
        },
        employerId: 'employer1234',
    },
    employer: {
        isFetching: false,
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
        name: 'mock employer',
        twitter: 'twitter.com',
        website: 'www.mock.com',
        jobs: null,
    },
};