## Implemtation of a Financial Management System:
[Click here to view API documentation](https://documenter.getpostman.com/view/18966325/2sA2rCV2jW).

### Key Implementation Details:

- **User Authentication and Authorization:** Signup and signin logic were implemented, utilizing JWT tokens alongside the built-in Guard decorator for authorization. Additionally, Redis caching was employed to store user details, optimizing performance by reducing latency and facilitating ease of access in the business logic.

- **Account Management:** APIs were created to manage user accounts, including functions to create new accounts, retrieve account details, and list transactions associated with specific accounts.

- **Transaction Management:** Database transactions were utilized in creating account transaction records to ensure atomicity and consistency.

- **Data Validation and Error Handling:** A Pipe Decorator alongside Joi, a data validation library, was employed to ensure data integrity. Built-in exception classes handled errors in a client-friendly manner
.
- **Pagination:** Implemented pagination on all list endpoints to improve database performance and reduce latency.


- **Logging and Monitoring:** Logging was managed using morgan, a logger, while Sentry was utilized for monitoring purposes.

- **Database Abstractions:** Database abstractions were created using repositories to encapsulate database communications.

- **Containerization:** Docker and docker-compose were employed to containerize the application and its dependencies, including Redis and MongoDB.

- **Testing:** Unit tests were written using Jest to ensure the reliability of the solution.

- **Security:** Utilized Bcrypt for password hashing and Implemented Access Control.

### Folder structure

- **modules:** Each sub-folder in this directory contains: controller, service repository and type definition files.

- **pipes:** This folder houses the data validation logic.

- **guards:** This folder houses authorization logic.


- **exception-filters:** This folder contains the logic for monitoring which sends alert to the administrator anytime there is an Internal server error.


- **constants:** This folder contains environment variable declarations and app constants for dependency injection.



### Scripts

Build: To build the project run `npm run build`

Run: To start the app with docker run `npm run docker`. Ensure you have docker installed.

Test: To run all unit tests run `npm run test`.

Ensure you have nest cli installed before running any of the above script. Run `npm install -g @nestjs/cli` to install it.