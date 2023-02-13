&nbsp;
# NailPolish

NailPolish is a NodeJS project for managing orders to beauty salons

&nbsp;


## Database

You can find the db configuration in `db.config.js` file.
you might change the values according to your own environment.

```javascript
module.exports = {
    PORT: '27017',
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'web'
}
```

&nbsp;

## Create / Remove the project's db
- Create the `web` db by using the following api:
```javascript
http://localhost:3000/createDB
```
Excecuting this api will also create all of the project collections:
- users
- orders
- salons

&nbsp;

*** You might want to drop the whole db, in order to do so just use the following api:

- Drop the `web` db by using the following api:
```javascript
http://localhost:3000/dropDB
```

&nbsp;

## Users
- User model:
```javascript
{
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
}
```
- Create users collection:
```javascript
[GET] http://localhost:3000/users/create
```
- Insert one record to users:
```javascript
[POST] http://localhost:3000/users/insert
```
- Get all users:
```javascript
[GET] http://localhost:3000/users/select
```
- Drop users collection:
```javascript
[GET] http://localhost:3000/users/drop
```

&nbsp;

## Orders
- Order model:
```javascript
{
    userEmail: {
        type: String,
        required: true,
    },
    salonName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}
```
- Create orders collection:
```javascript
[GET] http://localhost:3000/orders/create
```
- Insert one record to orders:
```javascript
[POST] http://localhost:3000/orders/insert
```
- Get all orders:
```javascript
[GET] http://localhost:3000/orders/select
```
- Get all orders of a user by email:
```javascript
[GET] http://localhost:3000/orders/selectByUserEmail?email=user@gmail.com 
```
- Remove an order by id:
```javascript
[DELETE] http://localhost:3000/orders/remove/1 
```
- Drop orders collection:
```javascript
[GET] http://localhost:3000/orders/drop
```

&nbsp;

## Salons
- Salon model:
```javascript
{
    salonName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    openingHours: {
        type: Array,
        required: true
    }
}
```
- Create salons collection:
```javascript
[GET] http://localhost:3000/salons/create
```
- Insert one record to salons:
```javascript
[POST] http://localhost:3000/salons/insert
```
- Get all salons:
```javascript
[GET] http://localhost:3000/salons/select
```
- Search salons by parameters:
```javascript
[GET] http://localhost:3000/salons/search?address=Address&time=17 
```
- Drop salons collection:
```javascript
[GET] http://localhost:3000/salons/drop
```