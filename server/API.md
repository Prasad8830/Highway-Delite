# Highway Delite API Documentation

Base URL: `http://localhost:3000/api`

## Experiences Endpoints

### Get All Experiences
```
GET /api/experiences
```

**Example:**
```bash
GET /api/experiences?search=kayak
GET /api/experiences?location=bangalore
GET /api/experiences?minPrice=800&maxPrice=1200
```

### Get Experience by ID
```
GET /api/experiences/:id
```

## Bookings Endpoints

### Create Booking
```
POST /api/bookings
```


### Get Booking by Reference ID
```
GET /api/bookings/:refId
```



### Get All Bookings (Admin/Testing)
```
GET /api/bookings
```


### Validate Promo Code
```
POST /api/bookings/validate-promo
```
## Health Check
```
GET /api/health
```