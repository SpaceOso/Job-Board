import {expect} from 'chai';
import 'mocha';
import companyReducer from '../reducers/companyReducer';
import {Company} from '../types';


const mockCompany: Company = {
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

describe('company Reducer', () => {
    it('should RETURN an empty company', () => {
        expect(companyReducer(undefined, {})).eql(mockCompany);
    });
});
