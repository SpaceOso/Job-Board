import {expect} from 'chai';
import 'mocha';
import employerReducer from '../reducers/employerReducer';
import {Employer} from '../types';


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
