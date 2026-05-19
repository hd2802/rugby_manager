# Rugby Manager

A Football Manager-esque game for Rugby Union. 



## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Python (FastAPI), SQLAlchemy, Pydantic

**Database**: PostgreSQL (run locally)


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

Create your virtual environment

``` bash
python3 -m venv venv
```

Activate the virtual environment

``` bash
source venv/bin/activate
```

Install the packages

``` bash
pip install -r requirements.txt
```

To run the Python backend 

``` bash
uvicorn app.main:app --reload 
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