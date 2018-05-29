# Full-Stack Job Board

A project I've been working on to learn the ins and outs of web applications. Front end is developed in react using Node with Express and PostgreSQL for the backend.

This project is still farm from finished but if you would like to view the current progress you can visit:

## Demo Link
http://spaceoso.com/

To view the company dashboard you can either create a new account or use these credentials:

````
email: tester@gmail.com
password: 123
````

This site is not currently secured so please don't use actual email and passwords, it is still in heavy development.

### Prerequisites

You will need to have a PostgreSQL database with uuid-ossp library. Run the following SQL:

````
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
````
You will need an Amazon S3 account and create a .env file with the following properties:
````
SECRET_KEY=                 // for JWT
S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
DB_URL=                     // my database is hosted with heroku
DB_PASS=
DB_USER=
DB=
DB_HOST=
DB_PORT=
DEV_DB_PASS=            // this is for my loca machine
DEV_DB_USER=
DEV_DB=
DEV_DB_HOST=
DEV_DB_PORT=
````

## Running

````
npm run server  // to start the local server
npm run dev     // to start the local webpack dev server
npm run build   // to build production react app 
````

## Built With

* [React](https://reactjs.org/) - Front End
* [TypeScript](https://www.typescriptlang.org/) - Front End
* [Spring Framework](https://spring.io/) - Back End
* [PostgreSQL](https://www.postgresql.org/) - Database

## Authors

* **Miguel Rico**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
