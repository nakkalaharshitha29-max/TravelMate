# TravelMate

TravelMate is a travel planning website that helps users explore destinations,
plan trips, calculate budgets, and create travel bookings.

## Project 3 – Database Integration

This project integrates the TravelMate backend with a SQLite database to
provide persistent storage for travel booking information.

## Technologies Used

- HTML
- CSS
- JavaScript
- Python
- Flask
- SQLite
- Flask-CORS
- REST API

## Database

The project uses SQLite for storing booking information.

Database file:

travelmate.db

The database is automatically created when the Flask application is started.

## Database Schema

The bookings table contains the following fields:

| Field | Type | Description |
|---|---|---|
| id | INTEGER | Unique booking ID |
| name | TEXT | Customer name |
| email | TEXT | Customer email |
| destination | TEXT | Travel destination |
| travel_date | TEXT | Planned travel date |
| people | INTEGER | Number of travelers |

The `id` field is the primary key and is automatically generated.

## CRUD Operations

The backend supports all four basic CRUD operations.

### CREATE

Creates a new travel booking.

Method:

POST

Endpoint:

/api/bookings

### READ

Retrieves all bookings.

Method:

GET

Endpoint:

/api/bookings

A single booking can also be retrieved using:

GET /api/bookings/<booking_id>

### UPDATE

Updates an existing booking.

Method:

PUT

Endpoint:

/api/bookings/<booking_id>

### DELETE

Deletes an existing booking.

Method:

DELETE

Endpoint:

/api/bookings/<booking_id>

## API Base URL

http://127.0.0.1:5000

## How to Run the Project

### Step 1 – Open the project

Open the TravelMate project folder in VS Code.

### Step 2 – Open the terminal

Open:

Terminal → New Terminal

### Step 3 – Start the Flask backend

Run:

python app.py

The backend will start at:

http://127.0.0.1:5000

### Step 4 – Open the TravelMate website

Open `index.html` using VS Code Live Server.

### Step 5 – Create a booking

Use the TravelMate booking form and submit a booking.

The booking is sent from the frontend JavaScript to the Flask REST API.

### Step 6 – Check the stored bookings

Open:

http://127.0.0.1:5000/api/bookings

The stored bookings will be displayed as JSON.

## Data Persistence

Booking information is stored in the SQLite database instead of temporary
in-memory storage.

Therefore, the booking data remains available even after restarting the
Flask application.

## Project Structure

travelmate/
│
├── data/
│   └── bookings.json
│
├── images/
│
├── screenshots/
│
├── app.py
├── index.html
├── README.md
├── script.js
├── style.css
├── test-api.html
└── travelmate.db

## API Testing

The `test-api.html` file is used to test the CRUD API operations.

It can be used to test:

- Create booking
- Read all bookings
- Read a single booking
- Update booking
- Delete booking

## Conclusion

The TravelMate project now includes database integration using SQLite.

The backend connects to the database and performs CRUD operations for travel
bookings. The integration provides persistent storage and demonstrates how a
frontend application communicates with a backend REST API and database.