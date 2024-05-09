# sdspl-assesment
# Customer Management REST API

This is a simple Node.js REST API for managing customer data.

## Getting Started

To get started with the API, follow the instructions below.

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

### Installation

1. Clone this repository to your local machine: git clone https://github.com/tussharturkar/sdspl-assesment.git

2. Navigate to the project directory: cd sdspl-assesment

3. Install dependencies using npm: npm install
   
### Usage

1. Start the server: node .\index.js

2. The server will start running on `http://localhost:3000` by default.

3. Use any API testing tool like Postman to interact with the API endpoints.

### API Endpoints

1. **List customers with search and pagination:**
   - **URL:** `/customers`
   - **Method:** GET
   - **Parameters:**
     - `firstName` (optional): Search customers by first name
     - `lastName` (optional): Search customers by last name
     - `city` (optional): Search customers by city
     - `page` (optional): Page number for pagination (default is 1)
     - `limit` (optional): Number of customers per page (default is 10)

2. **Get single customer by id:**
   - **URL:** `/customers/:id`
   - **Method:** GET
   - **Parameters:**
     - `id`: ID of the customer

3. **List all unique cities with number of customers:**
   - **URL:** `/cities`
   - **Method:** GET

4. **Add a customer with validations:**
   - **URL:** `/customers`
   - **Method:** POST
   - **Body:** JSON object with the following fields:
     - `id`: ID of the customer
     - `first_name`: First name of the customer
     - `last_name`: Last name of the customer
     - `city`: City of the customer
     - `company`: Company of the customer

### Sample Customers JSON File

You can use the `customers.json` file included in the project to add, modify, or delete customer data.








