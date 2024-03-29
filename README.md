# NoobCode
A full-stack website to find solutions of various problems from [leetcode.com](https://leetcode.com/problemset/ "leetcode")

---

## Installation Prerequisites
The following are required for downloading and running this project.
* git (to clone the repository from github)
* node (to run the application)
* npm (to install the dependencies)
* mongodb (only needed if you want to use a local database, not required for remote database)

---

## Download
```bash
git clone https://github.com/shivanshsanoria1/Noobcode_MERN_stack.git
```

---

## Install dependencies

Inside the base directory:
```bash
npm install
```

Inside the **frontend** directory:
```bash
npm install
```

---

## Setting up environment variables

### Inside the base directory create a file named '.env'

Add the following variables inside it:
* #### Required
1. NODE_ENV (set the value to **development** or **production**, depending on the use case)
* #### Not-Required
1. PORT (custom port to run the nodejs server like 8001; default is 8000)
1. MONGODB_LOCAL_DB_NAME (custom name for the mongodb local database, default name is **noobcode_local**)
1. MONGODB_CONNECTION_URI (connection URI to connect to mongodb remote database, default action is to connect to a local mongodb database named **noobcode_local**)
1. SYNC_FILES (set the value to **true** for synchronizing files in the **LeetcodeSolutions** directory with the database; default behavior is to not sync the files)


### Inside the **frontend** directory create a file named '.env'

Add the following variables inside it:
* #### Not-Required
1. REACT_APP_BACKEND_ORIGIN (only needed in development mode, custom Origin of nodejs server like **http://localhost:8001**; default is **http://localhost:8000**)
1. REACT_APP_LEETCODE_TOTAL_PROBLEMS (total number of problems available on [leetcode.com](https://leetcode.com/problemset/ "leetcode"); default is 3077)

---
## Setting up the solutions directory (cloning method)
Inside the base directory:
```bash
git clone https://github.com/shivanshsanoria1/LeetcodeSolutions.git
```

---
## Setting up the solutions directory (manual method)
Inside the base directory:

Create a directory named **LeetcodeSolutions** with the following directories inside it:
1. **CPP [1-500]** (all files inside must have **.cpp** extension)
1. **CPP [501-1000]** (all files inside must have **.cpp** extension)
1. **CPP [1001-1500]** (all files inside must have **.cpp** extension)
1. **CPP [1501-2000]** (all files inside must have **.cpp** extension)
1. **CPP [2001-2500]** (all files inside must have **.cpp** extension)
1. **CPP [2501-3000]** (all files inside must have **.cpp** extension)
1. **CPP [3001-3500]** (all files inside must have **.cpp** extension)
1. **JS** (all files inside must have **.js** extension)
1. **SQL** (all files inside must have **.sql** extension)

### File naming convention

* #### Accepted solutions
  <**Quesion Number**>.<**Title**> <**[version]**>.<**extension**>
  ##### Samples:
   * 1234.the_is_a_sample_question [1].cpp
   * 1234.the_is_a_sample_question [2].cpp
   * 1234.the_is_a_sample_question [3].cpp


* #### Unaccepted solutions
  <**Quesion Number**>.<**Title**> <**[TLE** or   **MLE]**> <**[version]**>.<**extension**>

  ##### Samples:
   * 1234.the_is_a_sample_question [TLE] [1].cpp
   * 1234.the_is_a_sample_question [TLE] [2].cpp
   * 1234.the_is_a_sample_question [MLE] [3].cpp

#### NOTE:
1. **Title** must have underscore instead of whitespace.
1. **version** must be an integer value in range 1 to 9 (both inclusive).

---

## Development Built

To start the nodejs server at port 8000 (or any custom port if **PORT** is specified in .env file).

Inside the base directory:
```bash
npm run dev
```

To start the reactjs server at port 3000.

Inside the **frontend** directory:
```bash
npm start
```

---

## Production Built
To create the production-build of frontend.

Inside the **frontend** directory:
```bash
npm run build
```

To start the server.

Inside the base directory:
```bash
npm start
```

---
