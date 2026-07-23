1. create a project in https://neon.com/
2. connect it with your backend
- paste the connection url in your .env file
- in backend/config/db.js  set up the environment variables
- NOTE: NEON works on postgres and use SQL rather than NoSQL of mongoDB
3. configure the initDB() to set up my table.
4. create the routes for POSTing a transaction - for now in the server.js
5. use https://upstash.com to create a reddish database for rate limiting control
- get the env from reddish for the project
- configure the redis
- npm install @upstash/redis
- npm install @upstash/ratelimit
- configure the ratelimiter.js
- add the ratelimiter to the server.js as a middleware
6. Test the ratelimiter
