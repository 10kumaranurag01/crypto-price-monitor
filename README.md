# Crypto Price Monitor

A Node.js application that fetches and tracks the current prices, market caps, and 24-hour changes of cryptocurrencies like Bitcoin, Ethereum, and Matic. This application uses MongoDB for data storage and provides RESTful APIs for retrieving cryptocurrency statistics and price deviations.

## Table of Contents

- [Crypto Price Monitor](#crypto-price-monitor)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)
    - [1. Fetch Cryptocurrency Statistics](#1-fetch-cryptocurrency-statistics)
    - [2. Fetch Price Deviation](#2-fetch-price-deviation)
  - [File and Folder Structure](#file-and-folder-structure)

## Features

- Fetches cryptocurrency data from the CoinGecko API every 2 hours.
- Provides APIs to retrieve the latest statistics for specific cryptocurrencies.
- Calculates and returns the standard deviation of prices for the last 100 records.
- Utilizes MongoDB for data storage.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/10kumaranurag01/crypto-price-monitor
   cd crypto-price-monitor
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set the following environment variables:

   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:

   ```bash
   npm run start
   ```

## Usage

The server will start on `http://localhost:5000`. You can test the APIs using tools like Postman or cURL.

## API Documentation

### 1. Fetch Cryptocurrency Statistics

**Endpoint:** `GET /stats`

**Query Parameters:**

| Parameter | Type    | Description                  |
|-----------|---------|------------------------------|
| `coin`    | string  | The cryptocurrency ID (e.g., `bitcoin`, `matic-network`, `ethereum`) |

**Example Request:**

```http
GET /stats?coin=bitcoin
```

**Sample Response:**

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### 2. Fetch Price Deviation

**Endpoint:** `GET /deviation`

**Query Parameters:**

| Parameter | Type    | Description                  |
|-----------|---------|------------------------------|
| `coin`    | string  | The cryptocurrency ID (e.g., `bitcoin`, `matic-network`, `ethereum`) |

**Example Request:**

```http
GET /deviation?coin=bitcoin
```

**Sample Response:**

```json
{
  "deviation": 4082.48
}
```

## File and Folder Structure

Here’s a breakdown of the project's file and folder structure:

```
crypto-price-monitor/
├── src/
│   ├── config/
│   │   └── db.js            # Database connection configuration
│   ├── controllers/
│   │   ├── cryptoController.js  # Handles requests related to cryptocurrencies
│   ├── jobs/
│   │   └── fetchCryptoData.js   # Background job to fetch cryptocurrency data
│   ├── models/
│   │   └── cryptoModel.js        # MongoDB schema for cryptocurrencies
│   ├── routes/
│   │   └── cryptoRoutes.js       # Defines API routes for cryptocurrency data
│   ├── utils/
│   │   └── calculations.js        # Utility functions for calculations (e.g., standard deviation)
│   ├── app.js                    # Main application file
│   └── index.js                  # Entry point of the application
├── .env                           # Environment variables
|── Dockerfile                     # Dockerfile for containerization
├── package.json                   # Project metadata and dependencies
└── README.md                      # Project documentation
```