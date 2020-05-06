## Git Repo Analysis Project

**This application is to analyse github public repositories and created with MERN stack.**

This includes following features:

* A form to submit a GitHub repository for analysis (i.e., owner and repository name)
* A table showing the past analysis results of the logged in user in reverse chronological order
* Each row in the table presents a report with the following information
    1. Owner Id
    2. Repository Name
    3. The URL of the repository
    4. Number of commits in the repository
    5. Number of open pull requests in the repository
    6. A link with text “Show Readme” that should open a widget/modal with the README, if any in the repository
    7. Requests the results from the GitHub API
    8. It persists the results to show returning users their past analyses
    9. Refreshes the landing page with the new results

## Design decisions

### Web
* ReactJS library is used to create the UI, and project structure is created with create-react-app
* Redux Framework is used to maintain the application data.
* Two Pages will get dispalyed on UI:
    1. **Singin**: This will navigate user to github to sign in into the aplication and redirect back to application.
    2. **Dashboard**: This will displayed when user is authenticated wih github, and it included the following components:
        - *Header*: It will display the user information and singnout option to logout from application.
        - *Git Repository Form*: When user can submit the owner and repository name to fectch the data from github.
        - *Repository Analysis*: This table will display the repository data fetched from github.
        - *Footer*: It is included for future use to display footer section data.

### Backend
* Server is created using NodeJS and have used expressJS for routing.
* All api calls will navigate through apiateway.
* All git related api call will be done through gitservice.
* gitservice includes 2 services:
    1. repo: This is to handle data related api calls to github.
    2. user: This is to handle user autentication related api call to github.
* Authentication is done using jsonwebtoken.
* Users data will saved in users collection once the users is auhenticaticated and received access token through github api.
* Repository data will saved in repos once the data fetched through github api.

### Database
* Database created using MongoDB and named it as gitanalysis
* It includes 2 collections
    1. repos: It includes data relaed to repository
    2. users: It includes data related to users, it helps in maintaining access token for the logged in user.

## Steps to setup application in local

##### `Database Server Setup for MongoDB`
* [Install MongoDB from here](https://docs.mongodb.com/manual/administration/install-community/)
* To begin using MongoDB connect a mongo.exe shell to the running MongoDB instanceTo connect, open a **Command Interpreter** with Administrative privileges and run:
    ````
    "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
    ````
* Create database directory:
    ````
    cd C:\
    md "\data\db"
    ````
* Start your MongoDB database:
    ```sh
    "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
    ```
* To Check data in DB you can execute following commands:
    ```sh
    > show dbs            *It will list all databases created in mongodb*
    > use gitanalysis     *This is to use any specific database, in our case its gitanalysis*
    > show collections    *This is display all collections*
    > db.repos.find()     *This is to display data for repos collections*
    > db.users.find()     *This is to display data for users collections*
    ```
##### `Backend Server Setup for NodeJS`
* Go to Root directory of application and execute following commands:
    ```sh
    $ cd GIT-Repo-Analysis
    $ GIT-Repo-Analysis> npm install
    $ GIT-Repo-Analysis> cd apigateway
    $ GIT-Repo-Analysis/apigateway> npm install
    $ GIT-Repo-Analysis/apigateway> cd..
    $ GIT-Repo-Analysis/gitservice> npm install
    $ GIT-Repo-Analysis/gitservice> cd ..
    $ GIT-Repo-Analysis> npm start
    
    *It will display something like: *
    server is listening on 9000
    Connected to mongo database
    ````
##### `Client Server Setup for React`
* Go to Root directory of application and execute following commands:
    ```sh
    $ cd GIT-Repo-Analysis
    $ GIT-Repo-Analysis> cd web
    $ GIT-Repo-Analysis/web> npm install
    $ GIT-Repo-Analysis/web> npm start
    ```
### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.