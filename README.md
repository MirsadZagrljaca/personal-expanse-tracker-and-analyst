## Welcome to Personal Expense Tracker and Analyst

### Short Description

Web app for entering and tracking your expenses. Enjoy!

### Technologies

MERN stack app (MongoDB, Express, React and NodeJS with Mongoose)

### To run it you should

- git clone https://github.com/MirsadZagrljaca/personal-expanse-tracker-and-analyst
- cd frontend && npm install && npm start and open browser at localhost:3000
- cd backend && npm install && npm start

### Dependecies

#### backend

##### devDependencies

- babel-core
- babel-loader
- babel-preset-env
- babel-preset-stage-2
- nodemon
- webpack
- webpack-cli
- webpack-node-externals

##### dependencies

- body-parser
- compression
- cookie-parser
- cors
- crypto
- dot-env
- express
- express-jwt
- helmet
- jsonwebtoken
- lodash
- mongoose

#### frontend

- axios
- bootstrap
- crypto
- prop-types
- react
- react-bootstrap
- react-dom
- react-google-charts
- react-google-login
- react-router
- react-router-dom
- react-scripts
- react-vis
- web-vitals

### File names explained

#### backend

- config.js - config variables
- auth.controller.js - crud operations for auth route
- transaction.controller.js - crud operations for transaction route
- user.controller.js - crud operations for users
- dbErrorHelper.js - error messages from db
- transactions.model.js - mongoose schema for transactions
- user.models.js - mongoose schema for users
- auth.routes.js - routing for auth
- transactions.routes.js - routing for transactions
- user.routes.js - routing for users
- express.js - express file
- server.js - main file
- template.js - template for sending to browser

#### frontend

- paragon.png - paragon logo
- Footer.js - footer
- Header.js - header for logged in users
- LoginHeader.js - header for non logged users
- Menu.js - menu for going through app
- AddExpense.js - component for adding expenses
- AddIncome.js - component for adding incomes
- AddMenu.js - menu for swapping between adding incomes and expenses
- api-transactions.js - crud for transactions on frontend
- Dashboard.js - dashboard (home) page
- DeleteTransactions.js - modal for deleting transactions
- EditTransaction.js - page for editing transactions
- StatisticsMonth.js - montly statistics
- StatisticsWeek.js - weekly statistics
- StatisticsYear.js - yearly statistics
- TransactionsDaily.js - daily transactions
- TransactionsMonth.js - montly transactions
- TransactionsWeek.js - weekly transactions
- TransactionsYear.js - yearly transactions
- api-auth.js - authorised requests
- api-user.js - crud for users
- auth-helpers.js - helpers for checking if user is authorised
- DeleteUser.js - modal for deleting user
- Edit.js - page for editing user data
- EditPassword.js - page for changing password
- Login.js - login page
- Signup.js - creating account page
