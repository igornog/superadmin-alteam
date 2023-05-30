# Alteam - Intelligent freelance team matching
##Live site: https://alteam-portal-git-main-igornog.vercel.app/

<img width="1434" alt="Captura de Tela 2023-05-17 às 17 02 45" src="https://github.com/igornog/alteam/assets/29484089/20a7d9ec-0c90-4c8d-bed7-df78d90f9153">

<img width="396" alt="Captura de Tela 2023-05-17 às 17 03 16" src="https://github.com/igornog/alteam/assets/29484089/cef57afe-0703-43e3-97f0-36f99acd40f0">

<img width="1294" alt="Captura de Tela 2023-05-17 às 17 03 40" src="https://github.com/igornog/alteam/assets/29484089/9db589be-6fa3-4b30-bda8-45e76f54ddc1">

<img width="1203" alt="Captura de Tela 2023-05-17 às 17 03 55" src="https://github.com/igornog/alteam/assets/29484089/a7f76575-9e98-4110-9abb-3c20e880b535">

<img width="1280" alt="Captura de Tela 2023-05-17 às 17 04 26" src="https://github.com/igornog/alteam/assets/29484089/461ce4b2-5b03-490f-946a-ca4619bcafbd">

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
