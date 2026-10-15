# Cloud Resource Dashboard

A responsive cloud resource management dashboard built with Angular, TypeScript, and JSON Server. The application displays mock server, storage, and serverless function resources with searchable tables, region filters, summary statistics, and loading and error states.

## Features

- Dedicated Servers, Storage, and Functions pages
- Mock REST API powered by JSON Server
- Search resources by name
- Filter resources by region
- Summary cards with resource statistics
- Color-coded server status badges
- Loading, error, and empty states
- Responsive layout for desktop and mobile
- Angular Router navigation and typed API services

## Technology Stack

- Angular and TypeScript
- Angular Router
- Angular HttpClient
- JSON Server
- HTML and CSS

## Prerequisites

- Node.js and npm
- Angular CLI
- Git

## Installation

Clone the repository:

```bash
git clone Resource-Cloud-Dashboard
cd cloud-resource-dashboard
```

Install dependencies:

```bash
npm install
```

Install Angular CLI globally if required:

```bash
npm install -g @angular/cli
```

## Running the Project

Start the mock API in the first terminal:

```bash
npx json-server db.json --port 3000
```

Start the Angular application in a second terminal:

```bash
ng serve
```

Open http://localhost:4200 in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/servers` | Retrieve server resources |
| GET | `/storage` | Retrieve storage buckets |
| GET | `/functions` | Retrieve serverless function resources |

The application uses fictional sample data. It does not connect to or manage real AWS infrastructure.

## Project Structure

```text
src/app/
  core/
    models/
    services/
  layout/
    sidebar/
    topbar/
  pages/
    servers/
    storage/
    functions/
db.json
README.md
```

## Build

```bash
ng build
```

## AWS Service References

- Amazon EC2: https://aws.amazon.com/ec2/
- Amazon S3: https://aws.amazon.com/s3/
- AWS Lambda: https://aws.amazon.com/lambda/

## Author

Developed as an internship assignment to demonstrate Angular development, REST API integration, responsive UI design, and resource filtering.
