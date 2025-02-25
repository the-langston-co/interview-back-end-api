<img src="public/Langston-Logo.jpg" width="200" style="margin: 0 auto; display:block"/>
<h1 style="text-align: center; margin:0;">Back-end coding exercise</h1>
<br />

For this exercise, we will be adding some features/endpoints to an example application using the Nest.js framework.

The goal is to simulate a somewhat realistic situation that you may encounter while working at Langston. You are welcome
to use any
tools you'd like, including Google searches, AI Assistance (chatGPT, cursor, etc).

Please do your best to communicate your thought process as you go along. Feel free to ask questions.

Follow the instructions in **Project Setup** to get up and running, then work through implementing the items in the
**Tasks** section.

<!-- toc -->

- [Project Setup](#project-setup)
  * [Installation](#installation)
  * [Start the dev server](#start-the-dev-server)
  * [Run tests](#run-tests)
  * [Resources](#resources)
- [Tasks](#tasks)
  * [Get all tasks for a given user](#get-all-tasks-for-a-given-user)
  * [Manage my tasks](#manage-my-tasks)
  * [Process all pending tasks](#process-all-pending-tasks)
  * [Track login events](#track-login-events)
  * [Restrict ability to login after 3 failed attempts](#restrict-ability-to-login-after-3-failed-attempts)

<!-- tocstop -->

# Project Setup

## Installation

> [!Note]
> This project requires `Node v20`.

```bash
$ npm install
```

## Start the dev server

```bash
# development (will reload on changes)
$ npm run dev
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- [Swagger Documentation](http://localhost:3005/docs) for this app
- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

# Tasks

## Get all tasks for a given user

As a user, I want to fetch all the tasks belonging to a given `userId`.

## Manage my tasks

As a user, I want to be able to manage my tasks

- Update an existing task
- Delete a task

_Note: Only the user that created the task should be able to update/delete the task_

## Process all pending tasks

Add functionality to the app to "process" all unprocessed tasks in the system. When a task has been processed, the status should be updated in the database to reflect its new status.

## Track login events

Add the ability for the application to keep track of all `login` events so that we have an audit history:

- Event timestamp
- Login result
- The username / userId associated with the login attempt

## Restrict ability to login after 3 failed attempts

If a user tries to unsuccessfully log in more than 3 times, lock the user out for a period of time (say, 10 seconds) to prevent them from logging in, even if they provide the correct password.
