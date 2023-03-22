![Nest](assets/logo.png)

## Description

Starter kit project made with [Nest](https://github.com/nestjs/nest) that demonstrates CRUD user, JWT authentication, CRUD posts.

### Technologies implemented:

-   [typeorm](https://github.com/typeorm/typeorm) (ORM) + [PostgreSQL](https://www.postgresql.org/)
-   [JWT](https://jwt.io/)
-   [Swagger](https://swagger.io/)

## Prerequisites

-   [Node.js](https://nodejs.org/) (>= 16.13.1)
-   [yarn](https://yarnpkg.com/) (>= 1.22.17)

## Installation

```shell
$ yarn install
```

## Setting up the database for development and test

Copy .env-example to .env

```shell
$ cp .env-example .env
```

PostgreSQL database connection options are shown in the following table:

| Option   | Development | Test      |
| -------- | ----------- | --------- |
| Host     | localhost   | localhost |
| Port     | 5432        | 5432      |
| Username | postgres    | postgres  |
| Password | postgres    | postgres  |
| Database | nest        | nest_test |

## Running the app

```shell
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Other commands

```shell
# formatting code
$ yarn format

# generate migrations {name-migration} - change the name for your migration
$ yarn migration:generate -- db/migrations/{name-migration}

# run migrations
$ yarn migration:run 

# revert one migration from database
$ yarn migration:revert

```

## Run production configuration

```
NODE_ENV=development \
DB_HOST=127.0.0.1 \
DB_PORT=5432 \
DB_USERNAME=postgres \
DB_PASSWORD=password \
DB_NAME=nestjs_typeorm_template \
JWT_SECRET=jwtSuperSecret \
```

## Swagger API docs

This project uses the Nest swagger module for API documentation. [NestJS Swagger](https://github.com/nestjs/swagger) - [www.swagger.io](https://swagger.io/)  
Swagger docs will be available at localhost:3000/v1/docs

## Author template
[![Telegram](https://img.shields.io/badge/Github-vseriousv-lightgrey?style=plastic&logo=github)](https://github.com/vseriousv)
[![Telegram](https://img.shields.io/badge/Telegram-%40knowyourbackend-blue?style=plastic&logo=telegram)](https://t.me/knowyourbackend)
[![Instagram](https://img.shields.io/badge/Instagram-%40kirill_s_gavr-D301C5?style=plastic&logo=instagram)](https://www.instagram.com/kirill_s_gavr/)
[![YouTube](https://img.shields.io/badge/YouTube-%40kirill_s_gavr-FF0000?style=plastic&logo=youtube)](https://www.youtube.com/@kirill_s_gavr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kirill_s_gavr-0077B5?style=plastic&logo=linkedin)](https://www.linkedin.com/in/kirill-gavrilov-84a94ab6/)

Hey there 👋
I'm a Senior Backend Developer specializing in blockchain projects. I work on the development of backend systems and DevOps in blockchain companies. I'm also passionate about growing the KnowYourBackend community.
