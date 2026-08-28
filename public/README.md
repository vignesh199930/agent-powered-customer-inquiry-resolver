# Agent-Powered Customer Inquiry Resolver

A minimal full-stack application that accepts customer inquiries, identifies the primary topic using programmatic agent logic, retrieves relevant information from a predefined knowledge base, and generates a concise response.

## Features

- Customer inquiry input interface
- Topic classification using keyword matching
- Supported topics:
  - Pricing
  - Technical Support
  - Account Management
  - General Information
- Simulated knowledge base
- Programmatic response generation
- REST API endpoint for processing inquiries
- Input validation
- Responsive frontend interface

## Technology Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

## Project Structure

```text
agent-powered-customer-inquiry-resolver/
│
├── node_modules/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── decisions.md
└── ai_usage.md