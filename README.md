# to-do-task-manager

## Technologies Used

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Vitest
* Testing Library

### Backend

* Node.js
* Express
* Jest

## How to Run

### Using Docker

1. Make sure you have Docker and Docker Compose installed.
2. Run `docker-compose up -d` in the root directory.
3. The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

### Using npm

1. Make sure you have Node.js and npm installed.
2. Run `npm install` in the root directory to install all dependencies for both frontend and backend.
3. Run `npm run dev` in the root directory to start both the frontend and backend servers concurrently.
4. The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Test Results

### Frontend

```
> frontend@0.0.0 test
> vitest


 RUN  v3.2.4 C:/Users/malin/Desktop/Test/to-do-task-manager/frontend

 ✓ src/pages/LoginPage.test.tsx (2 tests) 926ms
   ✓ LoginPage > renders login form  491ms
   ✓ LoginPage > shows error on failed login  430ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  22:47:29
   Duration  5.90s (transform 194ms, setup 344ms, collect 473ms, tests 926ms, environment 2.66s, prepare 549ms)
```

### Backend

```
> backend@1.0.0 test
> jest --coverage

----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   69.15 |    34.61 |   42.85 |   71.15 |                   
 backend              |   85.71 |       50 |     100 |   85.71 |                   
  database.js         |   85.71 |       50 |     100 |   85.71 | 9-10              
 backend/controllers  |   82.05 |       50 |     100 |   82.05 |                   
  authController.js   |   88.88 |     62.5 |     100 |   88.88 | 12,25             
  taskController.js   |   76.19 |        0 |     100 |   76.19 | 9-12,21,31        
 backend/middleware   |     100 |      100 |     100 |     100 |                   
  rateLimiter.js      |     100 |      100 |     100 |     100 |                   
 backend/repositories |   21.73 |        0 |       0 |      25 |                   
  taskRepository.js   |   21.73 |        0 |       0 |      25 | 4-8,14-18,24-28   
 backend/routes       |     100 |      100 |     100 |     100 |                   
  authRoutes.js       |     100 |      100 |     100 |     100 |                   
  taskRoutes.js       |     100 |      100 |     100 |     100 |                   
 backend/services     |   45.45 |        0 |       0 |   45.45 |                   
  taskService.js      |   45.45 |        0 |       0 |   45.45 | 4-8,12,16         
----------------------|---------|----------|---------|---------|-------------------
PASS __tests__/auth.test.js
PASS __tests__/task.test.js

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        2.672 s, estimated 4 s
Ran all test suites.
```
