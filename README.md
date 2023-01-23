# Yjcapp

This project was generated using [Nx](https://nx.dev).

## Init Project

- Install Dependencies

  - `yarn` or `npm i`

- Then run this command to start stack :

  - `docker-compose -f ./libs/postgres-db/scripts/docker-compose.dev.yml up -d`

- Run project

  - To start all the app :

    - `yarn run all`

  - To start just an app
    - `nx serve client-api`

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

**If you are generating a new API don't forget to add it inside the `nginx.dev.conf`**

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@yjcapp/mylib`.
