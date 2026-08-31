from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow frontend to communicate with Flask
CORS(app)


# ========================================
# HOME / TEST API
# ========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome to TravelMate API",
        "status": "Backend is running successfully"
    })


# ========================================
# BOOKING API
# ========================================

bookings = []


@app.route("/api/bookings", methods=["POST"])
def create_booking():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
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
                "message": "Name is required"
            }), 400

        if not email:
            return jsonify({
                "message": "Email is required"
            }), 400

        if not destination:
            return jsonify({
                "message": "Destination is required"
            }), 400

        if not travel_date:
            return jsonify({
                "message": "Travel date is required"
            }), 400

        if not people:
            return jsonify({
                "message": "Number of people is required"
            }), 400


        # Create booking
        booking = {
            "id": len(bookings) + 1,
            "name": name,
            "email": email,
            "destination": destination,
            "travelDate": travel_date,
            "people": people
        }


        bookings.append(booking)


        return jsonify({
            "message": "Booking created successfully",
            "booking": booking
        }), 201


    except Exception as error:

        print("Booking error:", error)

        return jsonify({
            "message": "Server error",
            "error": str(error)
        }), 500


# ========================================
# GET ALL BOOKINGS
# ========================================

@app.route("/api/bookings", methods=["GET"])
def get_bookings():

    return jsonify({
        "bookings": bookings
    })


# ========================================
# RUN SERVER
# ========================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )