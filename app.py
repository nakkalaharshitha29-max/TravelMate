from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

# ========================================
# ENABLE CORS
# ========================================

CORS(app)


# ========================================
# DATABASE CONFIGURATION
# ========================================

DATABASE = "travelmate.db"


# ========================================
# DATABASE CONNECTION
# ========================================

def get_db_connection():

    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    return connection


# ========================================
# CREATE DATABASE TABLE
# ========================================

def init_database():

    connection = get_db_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            destination TEXT NOT NULL,
            travel_date TEXT NOT NULL,
            people INTEGER NOT NULL
        )
    """)

    connection.commit()

    connection.close()

    print("Database initialized successfully")


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
# CREATE BOOKING
# ========================================

@app.route("/api/bookings", methods=["POST"])
def create_booking():

    try:

        # Get JSON data from frontend
        data = request.get_json(silent=True)

        # Check whether data was received
        if not data:

            return jsonify({
                "message": "No booking data received"
            }), 400


        # ========================================
        # GET BOOKING DETAILS
        # ========================================

        name = str(
            data.get("name", "")
        ).strip()

        email = str(
            data.get("email", "")
        ).strip()

        destination = str(
            data.get("destination", "")
        ).strip()

        travel_date = str(
            data.get("travelDate", "")
        ).strip()

        people = data.get("people")


        # ========================================
        # VALIDATION
        # ========================================

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


        if people is None:

            return jsonify({
                "message": "Number of people is required"
            }), 400


        # Convert people to integer
        try:

            people = int(people)

        except (ValueError, TypeError):

            return jsonify({
                "message": "Number of people must be a number"
            }), 400


        if people < 1 or people > 20:

            return jsonify({
                "message":
                "Number of people must be between 1 and 20"
            }), 400


        # ========================================
        # SAVE BOOKING TO DATABASE
        # ========================================

        connection = get_db_connection()

        cursor = connection.execute("""
            INSERT INTO bookings
            (name, email, destination, travel_date, people)
            VALUES (?, ?, ?, ?, ?)
        """, (
            name,
            email,
            destination,
            travel_date,
            people
        ))

        connection.commit()

        booking_id = cursor.lastrowid

        connection.close()


        # ========================================
        # CREATE RESPONSE OBJECT
        # ========================================

        booking = {

            "id": booking_id,

            "name": name,

            "email": email,

            "destination": destination,

            "travelDate": travel_date,

            "people": people
        }


        # ========================================
        # TERMINAL OUTPUT
        # ========================================

        print()
        print("========================================")
        print("NEW TRAVELMATE BOOKING")
        print("========================================")
        print(booking)
        print("Saved to database successfully")
        print("========================================")
        print()


        # ========================================
        # SEND SUCCESS RESPONSE
        # ========================================

        return jsonify({

            "message":
            "Booking created successfully",

            "booking":
            booking

        }), 201


    except Exception as error:

        print()
        print("BOOKING ERROR:")
        print(error)
        print()

        return jsonify({

            "message":
            "Server error",

            "error":
            str(error)

        }), 500


# ========================================
# GET ALL BOOKINGS
# ========================================

@app.route("/api/bookings", methods=["GET"])
def get_bookings():

    try:

        connection = get_db_connection()

        rows = connection.execute("""
            SELECT *
            FROM bookings
            ORDER BY id DESC
        """).fetchall()

        connection.close()


        bookings = []

        for row in rows:

            bookings.append({

                "id": row["id"],

                "name": row["name"],

                "email": row["email"],

                "destination": row["destination"],

                "travelDate": row["travel_date"],

                "people": row["people"]

            })


        return jsonify({

            "bookings": bookings

        })


    except Exception as error:

        return jsonify({

            "message": "Server error",

            "error": str(error)

        }), 500


# ========================================
# GET SINGLE BOOKING
# ========================================

@app.route("/api/bookings/<int:booking_id>", methods=["GET"])
def get_single_booking(booking_id):

    try:

        connection = get_db_connection()

        row = connection.execute("""
            SELECT *
            FROM bookings
            WHERE id = ?
        """, (booking_id,)).fetchone()

        connection.close()


        if row is None:

            return jsonify({

                "message": "Booking not found"

            }), 404


        booking = {

            "id": row["id"],

            "name": row["name"],

            "email": row["email"],

            "destination": row["destination"],

            "travelDate": row["travel_date"],

            "people": row["people"]

        }


        return jsonify({

            "booking": booking

        })


    except Exception as error:

        return jsonify({

            "message": "Server error",

            "error": str(error)

        }), 500


# ========================================
# UPDATE BOOKING
# ========================================

@app.route("/api/bookings/<int:booking_id>", methods=["PUT"])
def update_booking(booking_id):

    try:

        data = request.get_json(silent=True)

        if not data:

            return jsonify({

                "message": "No booking data received"

            }), 400


        name = str(
            data.get("name", "")
        ).strip()

        email = str(
            data.get("email", "")
        ).strip()

        destination = str(
            data.get("destination", "")
        ).strip()

        travel_date = str(
            data.get("travelDate", "")
        ).strip()

        people = data.get("people")


        # ========================================
        # VALIDATION
        # ========================================

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


        try:

            people = int(people)

        except (ValueError, TypeError):

            return jsonify({
                "message": "Number of people must be a number"
            }), 400


        if people < 1 or people > 20:

            return jsonify({
                "message":
                "Number of people must be between 1 and 20"
            }), 400


        # ========================================
        # UPDATE DATABASE
        # ========================================

        connection = get_db_connection()

        cursor = connection.execute("""
            UPDATE bookings
            SET
                name = ?,
                email = ?,
                destination = ?,
                travel_date = ?,
                people = ?
            WHERE id = ?
        """, (
            name,
            email,
            destination,
            travel_date,
            people,
            booking_id
        ))

        connection.commit()

        connection.close()


        if cursor.rowcount == 0:

            return jsonify({

                "message": "Booking not found"

            }), 404


        return jsonify({

            "message":
            "Booking updated successfully"

        })


    except Exception as error:

        return jsonify({

            "message": "Server error",

            "error": str(error)

        }), 500


# ========================================
# DELETE BOOKING
# ========================================

@app.route("/api/bookings/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):

    try:

        connection = get_db_connection()

        cursor = connection.execute("""
            DELETE FROM bookings
            WHERE id = ?
        """, (booking_id,))

        connection.commit()

        connection.close()


        if cursor.rowcount == 0:

            return jsonify({

                "message": "Booking not found"

            }), 404


        return jsonify({

            "message":
            "Booking deleted successfully"

        })


    except Exception as error:

        return jsonify({

            "message": "Server error",

            "error": str(error)

        }), 500


# ========================================
# START DATABASE AND SERVER
# ========================================

if __name__ == "__main__":

    init_database()

    print()
    print("========================================")
    print("      TRAVELMATE FLASK BACKEND")
    print("========================================")
    print("Server starting...")
    print("API URL: http://127.0.0.1:5000")
    print("Booking API: http://127.0.0.1:5000/api/bookings")
    print("Database: travelmate.db")
    print("========================================")
    print()

    app.run(

        host="127.0.0.1",

        port=5000,

        debug=True

    )