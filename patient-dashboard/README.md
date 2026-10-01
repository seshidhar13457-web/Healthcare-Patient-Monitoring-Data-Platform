# Healthcare Patient Monitoring Frontend

React and Vite dashboard for the Healthcare Patient Monitoring Data Platform.

## Features

- Filter by hospital, ward, device, and status
- Search by patient ID
- Summary metrics calculated from filtered records
- Hospital event distribution
- Critical alerts and patient event table
- Filtered CSV export
- Responsive layout

## Data

Currently uses eight synthetic sample records.
No live Databricks connection or backend API is implemented.
Alert labels are illustrative.

## Run locally

Install Node.js and npm, then run:

    cd patient-dashboard
    npm install
    npm run dev

Open the Local URL printed in the terminal.

## Production build

    npm run build

## Planned live connection

React frontend → authenticated backend API → Databricks Gold tables.

Databricks credentials must stay on the backend.