// src/types/index.tsx

export interface Job {
  id: string;
  title: string;
  description: string;
  employerId: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  Employer: {
    id: string;
    name: string;
    location: {
      address: string;
      city: string;
      state: string;
      zip: string;
    };
    logoImg: string | null;
    website: string | null;
    facebook: string | null;
    twitter: string | null;
    linkedIn: string | null;
  };
  createdAt: string;
}

export interface SiteError {
  typeOfError: string;
  message: string;
}

export interface PrivateJobView extends Job {
  applicants: string[];
}

export interface SiteErrors {
  login: SiteError | null;
  dashBoard: SiteError | null;
  dataRequest: SiteError | null;
}

export interface SiteFetching {
  isFetching: boolean;
}

/**
 * @type AuthUser
 * @property {(string | null)} firstName - The users first name
 * @property {(string | null)} lastName - The users last name
 * @property {(string | null)} email - The users email
 * @property {(string | null)} password - The users hashed password //todo need to has this
 */
export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * @type User
 * @property {(string | null)} employerId - This gets set after the user creates an employer account after log-in in
 * @property {(boolean | null)} isAuth - This gets set after the user logs in or we authenticate the JWT
 * @property {(boolean | null)} isFetching - We use this to display a spinner component if the user is waiting for async operation
 * @property {(string | null)} error - We currently are not using this //todo make sure if save to remove
 */
export interface User extends AuthUser {
  id: string | null;
  employerId: string | null;
  isAuth: boolean;
  isFetching: boolean | null;
  error: string | null;
}

export interface Employer {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  logoImg: string;
  website: string;
  twitter: string;
  facebook: string;
  linkedIn: string;
  jobs: EmployerJobView[] | null;
  isFetching: boolean | null;
}

export interface CurrentJobPost extends Job {
  isFetching: boolean;
}

export interface Applicants {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  resume: null;
  website: string | null;
  status: string;
  reviewed: boolean;
  coverLetter: string;
  createdAt: string;
  updatedAt: string;
  jobId: string;
}

export interface EmployerJobView extends Job {
  Applicants: Applicants[];
}

export interface StoreState {
  jobs?: Job[];
  user?: User | null;
  employer?: Employer | null;
  currentJobPost?: CurrentJobPost;
  siteFetching?: SiteFetching;
  siteErrors?: SiteErrors;
}
