# AutoMarkt REST API
This is an API for a very basic buy&sell vehicles application, built for educational purposes.
It is relies on ExpressJS, MongoDB and AWS S3.

## Getting started
To run the server follow the guide:
1. Set the following environment variables: 
> NODE_ENV, PORT, DB_CONNECTION_STRING, SECRET, AWS_AccessKeyID, AWS_SecretAccessKey

`AWS_AccessKeyID, AWS_SecretAccessKey` are optinal if you use AWS S3 for storing images

2. open a command prompt and run `npm install` to install the dependencies
3. run `npm start` and make requests

## Authentication
The API uses http-only cookie for authentication. On request which requires authentication the API verifies the **access token** if present. If it is not valid or not present the server responds with status 401.

### Register
Register a user by sending a `POST` request to `/register` with body that contains email, username and password `{ email, username, password }`. Upon succesful registration the service responds json object: `{ _id, email, username }`

### Login
Log in by sending a `POST` request with email and password to `/login`. The service will respond with an object that contains user information `{ _id, email, username }` and sets a http-only cookie for the **access token**.

### Logout
Log out by sending `GET` request to `/logout`. The service responds with `{ message: 'Logged out' }` if the user is logged in.

### Check you authentication status
- Method `GET`
- Endpoint `/me`
- Returns `JSON`

## Get URL for uploading image to AWS S3
You should be logged in to request URL.
Send a `GET` request to the endpoint.

- Method `GET`
- Endpoint `/vehicles/imageUploadUrl`
- Returns `JSON`

## CRUD Operations
Supported request are `GET`,`POST`,`PUT`,`DELETE`

### CREATE
You should be logged in to create a product!
Send a POST request to the endpoint. The with body, containing `{ make, model, description, mileage, year, category, VIN, price, imageUrl }`. The service will respond with the object, created in the database, which will have an added _id and creator properties, that are automatically generated.

- Method `POST`
- Endpoint `/vehicles/create`
- Headers `Content-Type: application/json`
- Body Format `JSON`
- Returns `JSON`

### READ
Send a `GET` request to the endpoint.

- Method `GET`
- Endpoint for every vehicle `/vehicles`
- Endpoint for specific product `/vehicles/:_id`
- Endpoint for vehicles in specific category `/vehicles?category=<category>`
- Endpoint for vehicles with sorting `/vehicles?sort=<sorting>`
- Endpoint for paginated vehicles  `/vehicles?page=<currentPage>&pageSize=<sizeOfThePage>`
- You can also mix params `/vehicles?category=<category>&sort=<sorting>&page=<currentPage>&pageSize=<sizeOfThePage>`
- Endpoint for latest vehicles `/vehicles?latest=<number>`
- Endpoint for count of all vehicles `/vehicles/count`
- Endpoint for count of vehicles in category `/vehicles/count?category=<category>`
- Endpoint for vehicle category types `/vehicles/categories`
- Endpoint for vehicle makes `/vehicles/makes`
- Returns `JSON`

> Available sorting types are ['makeAsc', 'makeDesc', 'priceAsc', 'priceDesc', 'yearAsc', 'yearDesc'].

### UPDATE
You should be the creator of the product to edit it!
Send a POST request to the endpoint. The with body, containing and object with the information you want to update. The service will respond with the updated object.

- Method `PUT`
- Endpoint `/vehicles/:_id`
- Headers `Content-Type: application/json`
- Body Format `JSON`
- Returns `JSON`

### DELETE
Send a `GET` request to the endpoint.
You should be the creator of the product to delete it!

- Method `GET`
- Endpoint `/vehicles/:_id`
- Returns `Vehicle has been deleted`

# IN THE FIRST COMMITS THERE IS ENV VARIABLES FILE WITH VALUES THAT WERE ONLY FOR TEST PURPOSES
