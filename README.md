# **Social Network API**

## **Description**
This is a **Social Network API** built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. The API enables users to:
- Create and manage user profiles.
- Share thoughts and react to friends' thoughts.
- Add and remove friends from a user's friend list.

The API is designed to handle large volumes of unstructured data, making it ideal for social networking applications.

---

## **Table of Contents**
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Walkthrough Video](#walkthrough-video)
- [Dependencies](#dependencies)
- [License](#license)
- [Contact](#contact)

---

## **Installation**

1. From the CLI clone the repository:
  - git clone https://github.com/ilPacoOG/socialAPI.git
2. Then:
  - cd socialAPI
  - npm install (installs dependencies)
  - npm run build
  - npm run start (initialize the application for testing

## **Usage**
Test the API endpoints using tools like Insomnia or Postman. Refer to the API Endpoints section for detailed information.

## **API Endpoints**

### **User Routes**
| Method | Endpoint                               | Description                                 |
|--------|---------------------------------------|---------------------------------------------|
| GET    | `/api/users`                          | Get all users                              |
| GET    | `/api/users/:userId`                  | Get a single user by ID                    |
| POST   | `/api/users`                          | Create a new user                          |
| PUT    | `/api/users/:userId`                  | Update a user by ID                        |
| DELETE | `/api/users/:userId`                  | Delete a user by ID                        |
| POST   | `/api/users/:userId/friends/:friendId`| Add a friend to a user's friend list       |
| DELETE | `/api/users/:userId/friends/:friendId`| Remove a friend from a user's friend list  |

### **Thought Routes**
| Method | Endpoint                                   | Description                                 |
|--------|-------------------------------------------|---------------------------------------------|
| GET    | `/api/thoughts`                           | Get all thoughts                           |
| GET    | `/api/thoughts/:thoughtId`                | Get a single thought by ID                 |
| POST   | `/api/thoughts`                           | Create a new thought                       |
| PUT    | `/api/thoughts/:thoughtId`                | Update a thought by ID                     |
| DELETE | `/api/thoughts/:thoughtId`                | Delete a thought by ID                     |
| POST   | `/api/thoughts/:thoughtId/reactions`      | Add a reaction to a thought                |
| DELETE | `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction from a thought    |

## **Walkthrough Video**

https://github.com/user-attachments/assets/1e3b7ccb-aa7a-4158-9693-2d5b1cebaeb1

## **Dependencies**
  - The primary dependencies used for this project, as stated above, are Node.js, Express, Mongoose, and MongooseDB

## **License**
  - This application is covered under MIT License.
    See the [full license](https://opensource.org/licenses/MIT) for more information.

## **Contact**
  - By email @ mikahl171
  - Github @ https://github.com/ilPacoOG/socialAPI 





