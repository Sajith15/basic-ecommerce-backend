# ecommerce-backend
NodeJS Backend for an eCommerce Application

# Setup

1. Install Node Packages as per requirements
```
npm install
```

2. Start MySQL Server and Create Database named 'ecommerce'
```
CREATE DATABASE ecommerce;
```

3. Run MySQL Migrations from src/migrations/ directory
```
node migration.js up
```

4. Run the Server
```
npm run dev
```
