import express from 'express';
import { readFileSync } from 'fs';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load customers data from customers.json file
const customersData = JSON.parse(readFileSync('customers.json'));

// 2) List API with search and pagination
app.get('/customers', (req, res) => {
  const { firstName, lastName, city, page = 1, limit = 10 } = req.query;
  
  let filteredCustomers = customersData;

  if (firstName) {
    filteredCustomers = filteredCustomers.filter(customer => customer.first_name.toLowerCase().includes(firstName.toLowerCase()));
  }

  if (lastName) {
    filteredCustomers = filteredCustomers.filter(customer => customer.last_name.toLowerCase().includes(lastName.toLowerCase()));
  }

  if (city) {
    filteredCustomers = filteredCustomers.filter(customer => customer.city.toLowerCase().includes(city.toLowerCase()));
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  res.json(paginatedCustomers);
});

// 3) API to get single customer data by id
app.get('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customersData.find(customer => customer.id === customerId);

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  res.json(customer);
});

// 4) API to list all unique cities with number of customers
app.get('/cities', (req, res) => {
  const cities = {};

  customersData.forEach(customer => {
    cities[customer.city] = cities[customer.city] ? cities[customer.city] + 1 : 1;
  });

  res.json(cities);
});

// 5) API to add a customer with validations
app.post('/customers', (req, res) => {
  const { id, first_name, last_name, city, company } = req.body;

  // Validate if all fields are provided
  if (!id || !first_name || !last_name || !city || !company) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate if city and company already exist
  const existingCustomer = customersData.find(customer => customer.id === id);
  if (!existingCustomer) {
    return res.status(400).json({ message: 'Customer does not exist' });
  }

  if (existingCustomer.city !== city || existingCustomer.company !== company) {
    return res.status(400).json({ message: 'City or company does not match' });
  }

  // If all validations pass, add the customer
  customersData.push({ id, first_name, last_name, city, company });
  res.status(201).json({ message: 'Customer added successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
