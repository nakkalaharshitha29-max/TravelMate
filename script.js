// ========================================
// TRAVELMATE JAVASCRIPT
// ========================================


// ========================================
// MOBILE NAVIGATION
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

    const navigationLinks =
        navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

        });

    });

}



// ========================================
// DESTINATION SEARCH + CATEGORY FILTER
// ========================================

const destinationSearch =
    document.getElementById("destinationSearch");

const destinationCards =
    document.querySelectorAll(".destination-card");

const searchMessage =
    document.getElementById("searchMessage");

const filterButtons =
    document.querySelectorAll(".filter-btn");

let selectedCategory = "all";


function filterDestinations() {

    const searchText =
        destinationSearch
            ? destinationSearch.value.toLowerCase().trim()
            : "";

    let foundDestination = false;


    destinationCards.forEach(function (card) {

        const destinationName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        const cardCategory =
            card.getAttribute("data-category");

        const matchesSearch =
            destinationName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "";

            foundDestination = true;

        } else {

            card.style.display = "none";

        }

    });


    if (searchMessage) {

        searchMessage.style.display =
            foundDestination ? "none" : "block";

    }

}


if (destinationSearch) {

    destinationSearch.addEventListener(
        "input",
        filterDestinations
    );

}


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedCategory =
            button.getAttribute("data-filter");


        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");

        filterDestinations();

    });

});



// ========================================
// PERMANENT FAVOURITES
// ========================================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const favouritesContainer =
    document.getElementById("favouritesContainer");

const noFavouritesMessage =
    document.getElementById("noFavouritesMessage");


let savedFavourites =
    JSON.parse(
        localStorage.getItem(
            "travelMateFavourites"
        )
    ) || [];



// ========================================
// DISPLAY FAVOURITES
// ========================================

function displayFavourites() {

    if (!favouritesContainer) {
        return;
    }


    const oldCards =
        favouritesContainer.querySelectorAll(
            ".favourite-card"
        );


    oldCards.forEach(function (card) {

        card.remove();

    });


    if (savedFavourites.length === 0) {

        if (noFavouritesMessage) {

            noFavouritesMessage.style.display =
                "block";

        }

        return;

    }


    if (noFavouritesMessage) {

        noFavouritesMessage.style.display =
            "none";

    }


    savedFavourites.forEach(function (destination) {

        const originalCard =
            Array.from(destinationCards).find(
                function (card) {

                    const name =
                        card.querySelector("h3")
                            .textContent
                            .trim();

                    return name === destination;

                }
            );


        if (!originalCard) {
            return;
        }


        const image =
            originalCard.querySelector("img").src;

        const description =
            originalCard.querySelector("p")
                .textContent
                .trim();

        const price =
            originalCard.querySelector("strong")
                .textContent
                .trim();


        const favouriteCard =
            document.createElement("article");

        favouriteCard.className =
            "favourite-card";


        favouriteCard.innerHTML = `

            <img
                src="${image}"
                alt="${destination} travel destination">

            <div class="favourite-card-content">

                <h3>
                    ${destination}
                </h3>

                <p>
                    ${description}
                </p>

                <strong>
                    ${price}
                </strong>

                <div class="favourite-card-buttons">

                    <button
                        class="details-btn"
                        onclick="showDestinationDetails('${destination}')">

                        View Details

                    </button>

                    <button
                        class="book-btn"
                        onclick="bookDestination('${destination}')">

                        Book Now

                    </button>

                </div>

            </div>

        `;


        favouritesContainer.appendChild(
            favouriteCard
        );

    });

}



// ========================================
// FAVOURITE BUTTONS
// ========================================

favoriteButtons.forEach(function (button) {

    const card =
        button.closest(".destination-card");


    if (!card) {
        return;
    }


    const destination =
        card.querySelector("h3")
            .textContent
            .trim();


    if (
        savedFavourites.includes(destination)
    ) {

        button.classList.add("active");

        button.innerHTML = "♥";

        button.setAttribute(
            "aria-label",
            "Remove from favourites"
        );

    }


    button.addEventListener(
        "click",
        function () {

            button.classList.toggle("active");


            if (
                button.classList.contains("active")
            ) {

                button.innerHTML = "♥";

                button.setAttribute(
                    "aria-label",
                    "Remove from favourites"
                );


                if (
                    !savedFavourites.includes(
                        destination
                    )
                ) {

                    savedFavourites.push(
                        destination
                    );

                }

            } else {

                button.innerHTML = "♡";

                button.setAttribute(
                    "aria-label",
                    "Add to favourites"
                );


                savedFavourites =
                    savedFavourites.filter(
                        function (item) {

                            return item !==
                                destination;

                        }
                    );

            }


            localStorage.setItem(
                "travelMateFavourites",
                JSON.stringify(
                    savedFavourites
                )
            );


            displayFavourites();

        }
    );

});


displayFavourites();



// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            if (name === "") {

                alert(
                    "Please enter your name."
                );

                return;

            }


            alert(
                "Thank you, " +
                name +
                "!\nYour message has been received."
            );


            contactForm.reset();

        }
    );

}



// ========================================
// BOOKING MODAL
// ========================================

const bookingModal =
    document.getElementById("bookingModal");

const closeBooking =
    document.getElementById("closeBooking");

const bookingForm =
    document.getElementById("bookingForm");

const bookingDestination =
    document.getElementById("bookingDestination");



// ========================================
// SET MINIMUM TRAVEL DATE
// ========================================

const travelDate =
    document.getElementById("travelDate");


if (travelDate) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const formattedDate =
        year +
        "-" +
        month +
        "-" +
        day;


    travelDate.min =
        formattedDate;

}



// ========================================
// OPEN BOOKING FORM
// ========================================

function bookDestination(destination) {

    if (
        bookingModal &&
        bookingDestination
    ) {

        bookingDestination.value =
            destination;


        bookingModal.classList.add(
            "active"
        );


        // Reset previous confirmation

        const existingConfirmation =
            document.querySelector(
                ".booking-success"
            );


        if (existingConfirmation) {

            existingConfirmation.remove();

        }

    }

}



// ========================================
// CLOSE BOOKING FORM
// ========================================

if (closeBooking) {

    closeBooking.addEventListener(
        "click",
        function () {

            bookingModal.classList.remove(
                "active"
            );

        }
    );

}



// ========================================
// CLOSE BOOKING WHEN CLICKING OUTSIDE
// ========================================

if (bookingModal) {

    bookingModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                bookingModal
            ) {

                bookingModal.classList.remove(
                    "active"
                );

            }

        }
    );

}



// ========================================
// CONFIRM BOOKING
// ========================================

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "bookingName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "bookingEmail"
                    )
                    .value
                    .trim();


            const destination =
                document
                    .getElementById(
                        "bookingDestination"
                    )
                    .value;


            const travelDateValue =
                document
                    .getElementById(
                        "travelDate"
                    )
                    .value;


            const people =
                Number(
                    document
                        .getElementById(
                            "numberOfPeople"
                        )
                        .value
                );



            // =================================
            // VALIDATION
            // =================================

            if (name.length < 2) {

                alert(
                    "Please enter a valid name."
                );

                return;

            }


            if (email === "") {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            if (travelDateValue === "") {

                alert(
                    "Please select a travel date."
                );

                return;

            }


            if (people < 1 || people > 20) {

                alert(
                    "Number of people must be between 1 and 20."
                );

                return;

            }



            // =================================
            // CHECK PAST DATE
            // =================================

            if (
                travelDateValue <
                travelDate.min
            ) {

                alert(
                    "Please select a future travel date."
                );

                return;

            }



            // =================================
            // CREATE CONFIRMATION
            // =================================

            const bookingBox =
                document.querySelector(
                    ".booking-box"
                );


            const oldConfirmation =
                document.querySelector(
                    ".booking-success"
                );


            if (oldConfirmation) {

                oldConfirmation.remove();

            }


            const confirmation =
                document.createElement(
                    "div"
                );


            confirmation.className =
                "booking-success";


            confirmation.innerHTML = `

                <div class="success-icon">
                    ✓
                </div>

                <h3>
                    Booking Confirmed!
                </h3>

                <p>
                    Thank you, <strong>${name}</strong>.
                </p>

                <div class="booking-summary">

                    <p>
                        <strong>Destination:</strong>
                        ${destination}
                    </p>

                    <p>
                        <strong>Travel Date:</strong>
                        ${travelDateValue}
                    </p>

                    <p>
                        <strong>Number of People:</strong>
                        ${people}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>

                </div>

                <button
                    class="btn primary-btn"
                    id="closeSuccess">

                    Done

                </button>

            `;


            bookingBox.appendChild(
                confirmation
            );


            // Hide booking form

            bookingForm.style.display =
                "none";


            // Done button

            const closeSuccess =
                document.getElementById(
                    "closeSuccess"
                );


            if (closeSuccess) {

                closeSuccess.addEventListener(
                    "click",
                    function () {

                        bookingModal.classList.remove(
                            "active"
                        );


                        bookingForm.reset();

                        bookingForm.style.display =
                            "";

                        confirmation.remove();

                    }
                );

            }

        }
    );

}



// ========================================
// DESTINATION DETAILS MODAL
// ========================================

const detailsModal =
    document.getElementById(
        "detailsModal"
    );

const closeDetails =
    document.getElementById(
        "closeDetails"
    );

const detailsTitle =
    document.getElementById(
        "detailsTitle"
    );

const detailsCountry =
    document.getElementById(
        "detailsCountry"
    );

const detailsDescription =
    document.getElementById(
        "detailsDescription"
    );

const detailsPrice =
    document.getElementById(
        "detailsPrice"
    );

const detailsImage =
    document.getElementById(
        "detailsImage"
    );

const detailsBookButton =
    document.getElementById(
        "detailsBookButton"
    );



// ========================================
// DESTINATION INFORMATION
// ========================================

const destinationDetails = {

    Hyderabad: {

        country: "India",

        description:
            "Explore historic monuments, delicious food, famous landmarks and the rich culture of Hyderabad.",

        price: "₹5,999",

        image:
            "images/hyderabad.jpg"

    },


    Goa: {

        country: "India",

        description:
            "Relax on beautiful beaches, enjoy water activities and experience the vibrant coastal lifestyle of Goa.",

        price: "₹7,499",

        image:
            "images/goa.jpg"

    },


    Manali: {

        country: "India",

        description:
            "Experience beautiful mountains, peaceful valleys, adventure activities and the natural beauty of the Himalayas.",

        price: "₹8,999",

        image:
            "images/manali.jpg"

    },


    Kerala: {

        country: "India",

        description:
            "Enjoy peaceful backwaters, lush greenery, beautiful landscapes and the relaxing atmosphere of Kerala.",

        price: "₹6,999",

        image:
            "images/kerala.jpg"

    },


    Rajasthan: {

        country: "India",

        description:
            "Discover royal palaces, magnificent forts, colourful culture and the rich history of Rajasthan.",

        price: "₹9,499",

        image:
            "images/rajasthan.jpg"

    },


    Andaman: {

        country: "India",

        description:
            "Discover crystal-clear waters, beautiful beaches, tropical islands and exciting island adventures.",

        price: "₹12,999",

        image:
            "images/andaman.jpg"

    }

};



// ========================================
// OPEN DESTINATION DETAILS
// ========================================

function showDestinationDetails(destination) {

    const details =
        destinationDetails[
            destination
        ];


    if (
        !details ||
        !detailsModal
    ) {

        return;

    }


    detailsTitle.textContent =
        destination;


    detailsCountry.textContent =
        details.country;


    detailsDescription.textContent =
        details.description;


    detailsPrice.textContent =
        details.price;


    detailsImage.style.backgroundImage =
        "url('" +
        details.image +
        "')";


    if (detailsBookButton) {

        detailsBookButton.onclick =
            function () {

                detailsModal.classList.remove(
                    "active"
                );

                bookDestination(
                    destination
                );

            };

    }


    detailsModal.classList.add(
        "active"
    );

}



// ========================================
// CLOSE DETAILS
// ========================================

if (closeDetails) {

    closeDetails.addEventListener(
        "click",
        function () {

            detailsModal.classList.remove(
                "active"
            );

        }
    );

}



// ========================================
// CLOSE DETAILS OUTSIDE
// ========================================

if (detailsModal) {

    detailsModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                detailsModal
            ) {

                detailsModal.classList.remove(
                    "active"
                );

            }

        }
    );

}
// ========================================
// STEP 27B - TRAVEL BUDGET CALCULATOR
// ========================================

const budgetDestination =
    document.getElementById("budgetDestination");

const budgetPeople =
    document.getElementById("budgetPeople");

const budgetNights =
    document.getElementById("budgetNights");

const hotelType =
    document.getElementById("hotelType");

const calculateBudget =
    document.getElementById("calculateBudget");

const budgetResult =
    document.getElementById("budgetResult");

const totalBudget =
    document.getElementById("totalBudget");


// ========================================
// CALCULATE TRAVEL BUDGET
// ========================================

if (calculateBudget) {

    calculateBudget.addEventListener(
        "click",
        function () {

            // Get values

            const destinationPrice =
                Number(budgetDestination.value);

            const people =
                Number(budgetPeople.value);

            const nights =
                Number(budgetNights.value);

            const hotelPrice =
                Number(hotelType.value);


            // ========================================
            // VALIDATION
            // ========================================

            if (destinationPrice === 0) {

                alert(
                    "Please select a destination."
                );

                return;

            }


            if (
                people < 1 ||
                people > 20
            ) {

                alert(
                    "Number of people must be between 1 and 20."
                );

                return;

            }


            if (
                nights < 1 ||
                nights > 30
            ) {

                alert(
                    "Number of nights must be between 1 and 30."
                );

                return;

            }


            // ========================================
            // CALCULATION
            // ========================================

            const destinationCost =
                destinationPrice * people;


            const hotelCost =
                hotelPrice *
                nights *
                people;


            const total =
                destinationCost +
                hotelCost;


            // ========================================
            // DISPLAY RESULT
            // ========================================

            totalBudget.textContent =
                "₹" + total.toLocaleString("en-IN");


            budgetResult.innerHTML = `

                <h3>
                    Estimated Trip Cost
                </h3>

                <p>
                    Destination package:
                    ₹${destinationCost.toLocaleString("en-IN")}
                </p>

                <p>
                    Hotel cost:
                    ₹${hotelCost.toLocaleString("en-IN")}
                </p>

                <strong id="totalBudget">
                    ₹${total.toLocaleString("en-IN")}
                </strong>

                <p class="budget-success">
                    ✈️ Have a wonderful journey!
                </p>

            `;

        }
    );

}
// ========================================
// STEP 28B - TRIP PLANNER
// ========================================

const createTripPlan =
    document.getElementById("createTripPlan");

const tripPlanResult =
    document.getElementById("tripPlanResult");

const tripDestination =
    document.getElementById("tripDestination");

const tripDate =
    document.getElementById("tripDate");

const tripPeople =
    document.getElementById("tripPeople");

const tripDays =
    document.getElementById("tripDays");


// ========================================
// CREATE TRIP PLAN
// ========================================

if (createTripPlan) {

    createTripPlan.addEventListener(
        "click",
        function () {

            const destination =
                tripDestination.value;

            const date =
                tripDate.value;

            const people =
                Number(tripPeople.value);

            const days =
                Number(tripDays.value);


            // Get selected activities

            const selectedActivities =
                document.querySelectorAll(
                    'input[name="activities"]:checked'
                );


            const activities = [];

            selectedActivities.forEach(
                function (activity) {

                    activities.push(
                        activity.value
                    );

                }
            );


            // ========================================
            // VALIDATION
            // ========================================

            if (destination === "") {

                alert(
                    "Please select a destination."
                );

                return;

            }


            if (date === "") {

                alert(
                    "Please select your travel date."
                );

                return;

            }


            if (people < 1 || people > 20) {

                alert(
                    "Number of people must be between 1 and 20."
                );

                return;

            }


            if (days < 1 || days > 30) {

                alert(
                    "Number of days must be between 1 and 30."
                );

                return;

            }


            // ========================================
            // ACTIVITIES
            // ========================================

            let activityText;

            if (activities.length === 0) {

                activityText =
                    "Relax and explore the destination.";

            } else {

                activityText =
                    activities.join(", ");

            }


            // ========================================
            // FORMAT DATE
            // ========================================

            const selectedDate =
                new Date(date);

            const formattedDate =
                selectedDate.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            // ========================================
            // CREATE RESULT
            // ========================================

            tripPlanResult.innerHTML = `

                <h3>
                    🎉 Your Trip Plan is Ready!
                </h3>

                <div class="trip-plan-details">

                    <p>
                        📍 <strong>Destination:</strong>
                        ${destination}
                    </p>

                    <p>
                        📅 <strong>Travel Date:</strong>
                        ${formattedDate}
                    </p>

                    <p>
                        👥 <strong>Travellers:</strong>
                        ${people}
                    </p>

                    <p>
                        🗓️ <strong>Duration:</strong>
                        ${days} day(s)
                    </p>

                    <p>
                        🎯 <strong>Activities:</strong>
                        ${activityText}
                    </p>

                </div>

                <div class="trip-message">

                    ✈️ Have a wonderful trip to
                    <strong>${destination}</strong>!

                </div>

            `;


            // Scroll to result

            tripPlanResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}
// ========================================
// STEP 29B - DESTINATION WEATHER
// ========================================

const weatherDestination =
    document.getElementById("weatherDestination");

const checkWeather =
    document.getElementById("checkWeather");

const weatherResult =
    document.getElementById("weatherResult");


if (checkWeather) {

    checkWeather.addEventListener("click", function () {

        const destination =
            weatherDestination.value;


        // ========================================
        // VALIDATION
        // ========================================

        if (destination === "") {

            alert("Please select a destination.");

            return;

        }


        // ========================================
        // WEATHER DATA
        // ========================================

        const weatherData = {

            Hyderabad: {
                icon: "☀️",
                temperature: "32°C",
                condition: "Sunny",
                description:
                    "Warm and sunny weather. Perfect for exploring the city."
            },

            Goa: {
                icon: "🌊",
                temperature: "30°C",
                condition: "Partly Cloudy",
                description:
                    "Warm coastal weather. Great for beaches and outdoor activities."
            },

            Manali: {
                icon: "🏔️",
                temperature: "18°C",
                condition: "Cool & Pleasant",
                description:
                    "Cool mountain weather. Perfect for sightseeing and nature trips."
            },

            Kerala: {
                icon: "🌧️",
                temperature: "28°C",
                condition: "Cloudy",
                description:
                    "Pleasant tropical weather with a chance of rain."
            },

            Rajasthan: {
                icon: "☀️",
                temperature: "35°C",
                condition: "Hot & Sunny",
                description:
                    "Hot and sunny weather. Stay hydrated while exploring forts and palaces."
            },

            Andaman: {
                icon: "🌴",
                temperature: "29°C",
                condition: "Tropical",
                description:
                    "Warm tropical weather. Ideal for beaches and water activities."
            }

        };


        const weather =
            weatherData[destination];


        // ========================================
        // DISPLAY WEATHER
        // ========================================

        weatherResult.innerHTML = `

            <div class="weather-icon">

                ${weather.icon}

            </div>

            <h3>

                ${destination}

            </h3>

            <h2>

                ${weather.temperature}

            </h2>

            <p class="weather-condition">

                ${weather.condition}

            </p>

            <p>

                ${weather.description}

            </p>

        `;


        // Scroll to result

        weatherResult.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    });

}