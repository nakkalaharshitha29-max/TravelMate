from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)

CORS(app)

BOOKING_FILE = "data/bookings.json"


# HOME
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome to TravelMate API",
        "status": "Backend is running successfully"
    })


# GET DESTINATIONS
@app.route("/api/destinations", methods=["GET"])
def get_destinations():

    destinations = [
        {"id": 1, "name": "Hyderabad", "price": 5999},
        {"id": 2, "name": "Goa", "price": 7499},
        {"id": 3, "name": "Manali", "price": 8999},
        {"id": 4, "name": "Kerala", "price": 6999},
        {"id": 5, "name": "Rajasthan", "price": 9499},
        {"id": 6, "name": "Andaman", "price": 12999}
    ]

    return jsonify(destinations)


# POST BOOKING
@app.route("/api/bookings", methods=["POST"])
def create_booking():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No booking data received"
        }), 400

    name = data.get("name")
    email = data.get("email")
    destination = data.get("destination")
    travel_date = data.get("travelDate")
    people = data.get("people")

    # Validation
    if not name:
        return jsonify({
            "success": False,
            "message": "Name is required"
        }), 400

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required"
        }), 400

    if not destination:
        return jsonify({
            "success": False,
            "message": "Destination is required"
        }), 400

    if not travel_date:
        return jsonify({
            "success": False,
            "message": "Travel date is required"
        }), 400

    if not people:
        return jsonify({
            "success": False,
            "message": "Number of people is required"
        }), 400

    booking = {
        "name": name,
        "email": email,
        "destination": destination,
        "travelDate": travel_date,
        "people": people
    }

    # Read existing bookings
    if os.path.exists(BOOKING_FILE):
        with open(BOOKING_FILE, "r") as file:
            bookings = json.load(file)
    else:
        bookings = []

    # Add new booking
    bookings.append(booking)

    # Save bookings
    with open(BOOKING_FILE, "w") as file:
        json.dump(bookings, file, indent=4)

    return jsonify({
        "success": True,
        "message": "Booking created and saved successfully",
        "booking": booking
    }), 201


# GET ALL BOOKINGS
@app.route("/api/bookings", methods=["GET"])
def get_bookings():

    if os.path.exists(BOOKING_FILE):
        with open(BOOKING_FILE, "r") as file:
            bookings = json.load(file)
    else:
        bookings = []

    return jsonify(bookings)


# RUN SERVER
if __name__ == "__main__":
    app.run(debug=True)
