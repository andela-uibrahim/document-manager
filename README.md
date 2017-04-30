# document-manager
[![Code Climate](https://codeclimate.com/github/andela-uibrahim/document-manager/badges/gpa.svg)](https://codeclimate.com/github/andela-uibrahim/document-manager)
[![Issue Count](https://codeclimate.com/github/andela-uibrahim/document-manager/badges/issue_count.svg)](https://codeclimate.com/github/andela-uibrahim/document-manager)
[![Coverage Status](https://coveralls.io/repos/github/andela-uibrahim/document-manager/badge.svg)](https://coveralls.io/github/andela-uibrahim/document-manager)
[![Build Status](https://travis-ci.org/andela-uibrahim/document-manager.svg?branch=development)](https://travis-ci.org/andela-uibrahim/document-manager)

## document-management

Document Management System is a react redux application that allows users to create, track, manage and store documents.


## Application Features

#### User Authentication

Users are authenticated and validated using JWT tokens.

#### Document Management

- Create an account
- Login with your credentials
- Create new document with specifying document title, content and document access
- Edit Documents
- Delete documents
- View public documents created by other users.
- View documents created by his access group with access level set as role.
- Search a users public documents.
- View public and role access level documents of other regular users.
- Logout
- In addition to the general user functions, an admin user can:
    * View all users.
    * View all created documents except documents with access set to private.
    * Delete any user.
    * Update any user's record.
    * Create a new role.
    * View all created roles.
    * Search for any user.



## Technologies and Services

#### Written in Javascript es6 syntax and nodejs on the backend, with the following:

- Mocha
- Webpack
- React Redux
- Travic CI
- Coveralls
- Hound CI
- HTML/CSS
- Materilized css
- Scss
- Sequelize
- Express

## Contributions

- Clone the repository.
- Install dependencies
- Create a new branch for included feature(s) using the keyword - feature/ example feature/new-feature.
- Raise a pull request.



## Installation

- Install NodeJs and Postgres on your machine
- Clone the repository $ git clone https://github.com/andela-uibrahim/document-manager.git
- Change into the directory $ cd /document-manager
- Install all required dependencies with $ npm install
- Create a .env file in your root directory

## Usage

- Migrate your database by running this command sequelize db:migrate:all
- Seed your database by running this command npm run db:seed:all, this seeds admin and regular roles, and superadmin user.
- Run npm start to start the application on development environment

## Testing

- Run Test npm test
- You can undo your migrations by running this command sequelize db:migrate:undo:all .
- I strongly suggest using separate DB for testing and development


##### Available API Endpoints and their Functionality
[Api documentation](https://freemiledocman.herokuapp.com/doc)

