// src/types/index.tsx

export interface createdDate{
    dayOfMonth: number,
    dayOfWeek: string,
    dayOfYea: number,
    month: string,
    year: number,
    monthValue: number,
    hour: number,
    minute: number,
    nano: number,
    second: number,
    chronology: {
        id: string,
        calendarType: string
    }
}

export interface Job {
  id: string;
  title: string;
  description: string;
    companyId: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdDate: createdDate | null;
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
 * @type Employee
 * @property {(string | null)} companyId - This gets set after the employee creates an company account after log-in in
 * @property {(string | null)} firstName - The employee first name
 * @property {(string | null)} lastName - The employee last name
 * @property {(string | null)} email - The employee email
 * @property {(string | null)} password - The employee hashed password //todo need to has this
 */
export interface Employee {
  id: string | null;
  companyId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * @type AuthEmployee
 * @property {(boolean | null)} isAuth - This gets set after the employee logs in or we authenticate the JWT
 * @property {(boolean | null)} isFetching - We use this to display a spinner component if the employee is waiting for async operation
 * @property {(string | null)} error - We currently are not using this //todo make sure if save to remove
 */
export interface AuthEmployee extends Employee {
  isAuth: boolean;
  isFetching: boolean | null;
  error: string | null;
}


/**
 * @type EmployeeWrapper
 * @property {Employee} employee - Full employee object
 * @property {string} companyId - Company UUID that this employer belongs to
 * @property {Company} company - Company that this employee belongs to
 */
export interface EmployeeWrapper {
  employee: Employee;
  companyId: string | null;
  company: Company;
}

export interface Company {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  logoImg: string;
  website: string;
  twitter: string;
  facebook: string;
  linkedIn: string;
  jobs: CompanyJobView[] | null;
  isFetching: boolean | null;
}

export interface JobPost {
  isFetching: boolean;
  job: Job;
    company: Company;
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

export interface CompanyJobView extends Job {
  Applicants: Applicants[];
}

export interface StoreState {
  jobs?: Job[];
    employee?: Employee | null;
    company?: Company | null;
  currentJobPost?: JobPost;
  siteFetching?: SiteFetching;
  siteErrors?: SiteErrors;
}
