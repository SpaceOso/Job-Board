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

export interface Address{
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  companyId: string;
  address: Address | null
  createdDate: string | null;
}

export interface SiteError {
  typeOfError: string;
  message: string;
}

export interface PrivateJobView extends Job {
  applicants?: any[];
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
 * @property {(string | null)} companyIdentifier - This gets set after the employee creates an company account after log-in in
 * @property {(string | null)} firstName - The employee first name
 * @property {(string | null)} lastName - The employee last name
 * @property {(string | null)} email - The employee email
 * @property {(string | null)} password - The employee hashed password //todo need to has this
 */
export interface Employee {
  id: string | null;
  companyIdentifier: string | null;
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
 * @property {string} companyIdentifier - Company UUID that this employer belongs to
 * @property {Company} company - Company that this employee belongs to
 */
export interface EmployeeWrapper {
  employee: Employee;
  companyId: string | null;
  company: Company;
}

/**
 * @type Company
 * @property {string | null} id - Company UUID
 * @property {string | null} name - Company name
 * @property {Address | null} address - Company address
 * @property {string | null} logoImg - File name and extension of company logo
 * @property {string | null} website - URL of company
 * @property {string | null} twitter - URL of twitter account of company
 * @property {string | null} facebook - URL of facebook account of company
 * @property {string | null} linkedIn - URL of linkedIn account of company
 * @property {CompanyJobView[] | null} jobs - list of jobs created by this company
 * @property {boolean | null} isFetching - indicates if we are currently fetching the server for information
 */
export interface Company {
  id: string | null;
  name: string | null;
  address: Address | null;
  logoImg: string | null;
  website: string | null;
  twitter: string | null;
  facebook: string | null;
  linkedIn: string | null;
  jobs: Job[] | null;
  applicantList: ApplicantView[] | null;
  isFetching: boolean | null;
}

export interface SecuredCompany extends Company{
  applicantList: ApplicantView[] | null;
}

export interface JobPost {
  isFetching: boolean;
  job: Job;
  company: Company;
}

export interface ApplicantView{
  [jobId: string] : Applicants
}

export interface JobApplicant{
  applicant: Applicants;
  appliedOnDate: string;
  id: string;
  lastModifiedDate: string;
  reviewed: boolean;
  status: string;
}

export interface Applicants {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  resume: null;
  resumeUrl: null;
  website: string | null;
  status: string;
  reviewed: boolean;
  coverLetter: string;
  coverLetterUrl: string;
  createdDate: string;
  lastModifiedDate: string;
  jobId: string;
}

export interface CompanyJobView extends Job {
  Applicants: Applicants[];
}

export interface StoreState {
  jobs?: Job[];
  employee?: AuthEmployee | null;
  company?: Company | null;
  currentJobPost?: JobPost;
  siteFetching?: SiteFetching;
  siteErrors?: SiteErrors;
}

export interface CompanyDTO{
  address : Address;
}

export interface JobDTO{
  job: Job;
  companyId: String;
}
