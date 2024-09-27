# Express.js Interview Test Backend

This is an Express.js backend for handling user authentication and notes management. It includes features such as sign-up, sign-in, user profile, and CRUD operations for notes.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) for the database

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:azhan3211/interview-test-be.git
    cd interview-test-be
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory to store environment variables:

    ```bash
    touch .env
    ```

    Add the following content to your `.env` file:

    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=be_test
    DB_PORT=3306

    PORT=3000
    SERVER_URL=http://localhost

    JWT_SECRET=3a35c28fd25163f428f811c410e198eb9c06072bca4766b84acfe9dd8382e854
    ```

4. Run the migrations (if necessary) to set up your database.

## Running the Application

To start the development server, run:

```bash
npm run dev
