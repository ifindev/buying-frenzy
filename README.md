# Buying Frenzy

## Description

Buying Frenzy is a backend service and a database for a simple food delivery platform. Currently, the supported API endpoints are for these operations only:

1. List all restaurants that are open at a certain datetime
2. List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically
3. Search for restaurants or dishes by name, ranked by relevance to search term
4. Process a user purchasing a dish from a restaurant

## More Documentations

To read more documentations about the project, see the `docs/` directory.

## Running App Locally

### Clone the App

To run the app locally, clone this repo first using the command of

```bash
git clone https://github.com/ifindev/buying-frenzy.git
```

<br>

### Install All Dependencies

This project was bootstraped using `npm`. To install all the required dependencies, run this command on your terminal exactly at the root project:

```bash
npm install
```

<br/>

### Setup `ENV` Variables

After you've installed all the dependencies, rename the `env.example` to `.env` so that all environment variables can be used in the app.

<br>

### Start-up Docker for Dev Environment

#### Install & Setup Docker

This project use Docker for a PostgreSQL database support in local development and for a uniform code distribution. If you didn't have Docker installed and configured, you can go to one of this link below for guides on how to install it on your machine:

- Mac: https://docs.docker.com/desktop/mac/install/
- Windows: https://docs.docker.com/desktop/windows/install/
- Linux: https://docs.docker.com/engine/install/

#### Running Docker Locally

After you've installed Docker successfully, go to the root folder and run the following command to startup both application server & PostgreSQL service:

```bash
npm run docker:dev
```

<br/>

### Setup Migrations & Database Seeds

#### Migrations & Seeds

After you succesfully setting up the docker with a PostgreSQL in it, the next step is to run the migration & seeding the tables. In this project, `knex` is used for all database related operations. In the beginning, it was decided that this project will use Prisma as an ORM. Unfortunately since multiple files schemas is still not supported in it, I decided to use `knex` since migrations file can be split into several different files.

To run a database migrations, run this command on the root project:

```bash
npm run knex:migrate
```

After successfully migrating the schemas, seed the database using the command below:

```bash
npm run knex:seed
```

#### After Seeding Warning

Once you've done seeding the database, re-running the seed command should give you error and a failed process. The reason why this is happening is because some of the tables such as `Restaurant`, are referenced by other tables as their foreign keys. Therefore truncating these kind of major tables are forbidden in PostgreSQL.

If you want to re-run the seeding process, you must `cascade truncate` all the major tables that are referenced by others & do simple truncate for minor tables. To do this, open up the Docker running PostgreSQL on tools like PGAdmin with the credentiials given in the `docker-compose`& `env` files. Then to truncate the major tables, run the following SQL query:

```SQL
TRUNCATE TABLE public."Table_Name" CASCADE
```

And the following query for minor tables:

```SQL
TRUNCATE TABLE public."Table_Name"
```

Then after that, re-running the seeding command will become succesfull.
<br>

### Running the App

After succesfully setting up the docker, database migrations, and database seeding, open up `localhost:1337` on your browser to do a quick sanity check. If all goes well, you can start sending request & get response from all of the api endpoints described in the `docs/02-api-specifications.md` directory.

### Copyright

Muhammad Arifin - 2022
