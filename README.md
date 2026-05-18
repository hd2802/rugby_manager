# Rugby Manager

A Football Manager-esque game for Rugby Union. 



## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Databse:** PostgreSQL (run locally), TypeORM (for modelling)


## Run Locally

Clone the project

```bash
  git clone https://github.com/hd2802/rugby-manager
```

Go to the project directory

```bash
  cd rugby-manager
```

Go to the backend

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Note: this will fail until you create the database

In a new terminal, go to the frontend

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
## Database
The database is currently locally ran. 

Create the database
``` bash
createdb rugby_manager
```

Seed the database (from the root folder)
``` bash
psql -h localhost rugby_manager < backend/migrations/init_save_ref_in_data.sql
```

## Running Tests

To run tests, run the following command in the backend

```bash
  npm run test
```

This project uses Jest for testing on the backend 