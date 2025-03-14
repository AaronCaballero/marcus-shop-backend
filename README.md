## Description

Marcus Shop is a full-stack application that allows admin users to create and manage their own online shop.
Here you can find the backend of the application.

This project is build with NestJS, TypeORM, PostgreSQL, and Docker.

I choose this stack because it is what I currently use in my projects and my daily work.

I also use Docker because it is the easiest way to run and deploy the application and it is very easy to configure. With it, I was
able to create an image that contails all the backend application dependencies and run it in a container. In these dependencies, is also include
the database, and when the project is compiled, it runs the migrations and creates the database and add some default data.


## Project setup: compile and run the project

With docker installed, run the following command:

```bash
$ docker-compose up -d
```

The server will be available at http://localhost:3000.


## Run tests

```bash
$ npm run test
```


## Technical decisions

I structured the project following the NestJS best practices, like using a 'Feature-based architecture'. This structure allows me to create a module for each feature of the application, and then import them in the main module, gaining scalability, maintainability, separation of concerns, testability, reusability and conceptual clarity.

First of all, I created a 'libs' folder, where I put all the libraries that I use in the project, like the OpenAPI library for the Swagger (I use the swagger-ui-express library to show the endpoints documentation on the browser: 'http://localhost:3000/api'), and the TypeORM Postgres library for the database.

On the 'src' folder ('main' folder) I put the main module of the application, and different 'modules' folders, where I put all the modules. Currently, I have two modules, the 'migrations' module, witch is used to create the database and the migrations, and the 'products' module, witch is used to create all the logic of the products.

In the 'produts' module, I have created the 'products.controller' and 'products.module' files, where the controller is the main file of the module, and the module is the file that imports all the dependencies of the module. The controller connects the enpoints with each specific service of the module. This services are split in the three different parts that form this module:
  - The 'product.service' file, where is the logic and functions to manage the product entity.
  - The 'product-customization.service' file, where is the logic and functions to manage the product customization entity.
  - The 'prohibited-customization.service' file, where is the logic and functions to manage the prohibited customization entity.

There are also more folders, startiting with 'adapter', that use a design pattern called 'Adapter' to convert the entities to DTOs and vice versa.

It follows the 'dto' folder, where there are the objects that are used to manage the data that is sent and received by the endpoints.

The next folder is the 'entity', where there are the entities that are used to manage the data in the database.

Finally, there is the 'enum' folder, where there are the enums that are used to manage enums of the entities and DTOs.

Morover, there is a 'test' folder, where there are the tests of the services and the controller. I only did a few test to show how it works, but this folder must be improved to cover almost all the functions of the application.

Mostly all of the funcions of the services are used to manage data between the database and the endpoints, due to it is a simple app that make get and post requests (also patch and delete), but there are also some functions that are used to validate and check some parameters and desired functionalities.

Moreover, I also created a function to validate the prohibited customizations of a product before creating an order, but for now, it is not used due to there are not 'orders' implemented in the project.


## Backend Guideline

1. Create NestJS Project
2. Install Postgres
3. Install TypeORM
4. Install Docker
5. Install Swagger
6. Create the database
7. Create the Product module
8. Create Customizations entity and endpoints
9. Create Prohibitions entity and endpoints
10. Update product customization endpoint and customization status
11. Create a migration to seed the database


## Nest Default License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
