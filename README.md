A svelte task manager.

Requires registration and authorization.
One can create, edit and delete tasks.
Tasks are cached in Redis (there are questions) and stored in a MySql database.

The project is automatically deployed to Versel. 
Database is stored on xata.io

To run the project locally:

1. Checkout the project
2. Redis should be available on localhost:6379.
3. Database is stored in xata.io
4. In the main directory of the project run `npm install`
5. In the main directory of the project run `npx prisma migrate deploy` to create the requred tables
6. In the main directory of the project run `npm run build` to build the project
7. Run `npm run preview` to preview

API (works without authorization):
  - GET /task/<taskId> - gets a task by its id
  - PUT /task/<taskId> - updates the specified task OR adds a new one, if the specified does not exist
  - DELETE /task/<taskId> - deletes the specified task
  - POST /create - creates a new task
  
task parameters:
  - `title`: String - name of the task
  - `description`: String - task description
  - `priority`: String - task priority (values "Low", "Medium", "High")
  - `status`: String - task status (values "New", "In progress", "Done")

