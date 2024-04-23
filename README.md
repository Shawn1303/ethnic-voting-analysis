# ethnic-voting-analysis
# Run back end
- cd `backend\server`
- run `.\gradlew.bat BootRun`
## Notes
- MongoDB cluster and database are specified in `src\main\resources\application.properties` as uri and database respectively.
    - Models pull from specific collections within the database and may omit fields.
- Each controller function is cached.
- Each repository interface extends MongoRepository so that general CRUD (create, read, update, delete) functions are provided. It is autowired in the controller such that getters, setters, fields are resolved by Spring.
- CORS is open for the domain at which React applications are hosted: `http://localhost:3000`.
- The server will run on `http://localhost:8080` by default. Can be run on port #### with `.\gradlew.bat bootRun --args="--server.port=####"`.

# Run front end in new terminal
- cd `frontend`
- run `npm install`
- run `npm install @mui/icons-material`
- run `npm start`
