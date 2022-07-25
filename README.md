# challenge-chapter-6

## Description

This project is built to implement Database, SQL, ORM, and Express (view engine & restful API (JSON)) - Challenge Chapter 6

## Installation

1. Cashier App requires [Node.js v16+](https://nodejs.org/en/), [Postgresql v14+](https://www.postgresql.org/download/), [Sequelize v6](https://sequelize.org/) to run.

2. Clone this repository.

   ```sh
   git clone https://gitlab.com/binar-bootcamp-fsw23/challenge-chapter-6
   ```

3. Mount the directory using terminal.

   ```sh
   cd challenge-chapter-6
   ```

4. Install dependencies via terminal

   ```sh
   npm install
   ```

5. Create `.env` file with contents according to the example (see [.env.example](/.env.example)) or your app will running default on PORT=3000

6. Run your postgres application.

7. Create database in your local computer

   ```sh
   npx sequelize-cli db:create
   ```

8. Migrate model into your database

   ```sh
   npx sequelize-cli db:migrate
   ```

9. Start your App via terminal

   ```sh
   npm run start
   ```

## Interaction with App

- Open this link on your browser <http://localhost:3000>, it's depend with your port setting
- You can try sign up and sign in to app via game or admin
- You can try restful API for this app on <http://localhost:3000/api/users> via [postman](https://www.postman.com/), for example: [Challenge-Chapter-6 Postman Collection](/challenge-chapter-6.postman_collection.json)

## Authors

Septian Maulana

## License

[MIT](/LICENSE.md) License
