console.log("JS is working!");
//DARK MODE
function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

//initial API fetch to display countries on page load
fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

    const container = document.getElementById("api-destinations");
    container.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${data[i].name.common}</h3>
            <img src="${data[i].flags.png}" width="100">
            <p>Capital: ${data[i].capital ? data[i].capital[0] : "N/A"}</p>
        `;
        container.appendChild(div);
    }
})
.catch(function(error) {
    console.log("Error:", error);
});

//form validation
document.getElementById("travelform").addEventListener("submit", function(e) {
    let valid = true;
    //VALUES
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let travelers = document.getElementById("travelers").value;
    let traveltype = document.getElementById("travel-type").value;
    let destination = document.getElementById("destination").value;
    let budget = document.getElementById("budget-range").value;
    let transport = document.getElementById("mode-of-transport").value;
    let details = document.getElementById("additional-details").value;

    //reset errors
    document.getElementById("NameError").textContent = "";
    document.getElementById("EmailError").textContent = "";
    document.getElementById("PhoneError").textContent = "";
    document.getElementById("TravelersError").textContent = "";
    document.getElementById("DestinationError").textContent = "";
    document.getElementById("Budget-rangeError").textContent = "";
    document.getElementById("Mode-of-transportError").textContent = "";
    document.getElementById("Additional-detailsError").textContent = "";

    //VALIDATION
    if (!name) {
        document.getElementById("NameError").textContent = "Name is required";
        valid = false;
    }
    if (!email) {
        document.getElementById("EmailError").textContent = "Email is required";
        valid = false;
    }
    if (!phone) {
        document.getElementById("PhoneError").textContent = "Phone number is required";
        valid = false;
    }
    if (!travelers) {
        document.getElementById("TravelersError").textContent = "Number of travelers is required";
        valid = false;
    }
    if (!destination) {
        document.getElementById("DestinationError").textContent = "Destination is required";
        valid = false;
    }
    if (!budget) {
        document.getElementById("BudgetError").textContent = "Budget range is required";
        valid = false;
    }
    if (!transport) {
        document.getElementById("TransportError").textContent = "Mode of transport is required";
        valid = false;
    }
    if (!traveltype) {
        document.getElementById("TravelTypeError").textContent = "Travel type is required";
        valid = false;
    }
    if (!details) {
        document.getElementById("DetailsError").textContent = "Special details are required";
        valid = false;
    }
    if (!valid) {
        e.preventDefault();
    }
});
// search country 
document.getElementById("search-btn").addEventListener("click", function() {
    let query = document.getElementById("search-input").value;
    fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            let container = document.getElementById("api-destinations");
            container.innerHTML = "";
            let countryData = data[0];
            container.innerHTML = `
            <div>
            <h2>${countryData.name.common}</h2>
            <img src="${countryData.flags.png}" width="150">
            <p>Capital: ${countryData.capital ? countryData.capital[0] : "N/A"}</p>
            <p><b><region>${countryData.region}</region></b></p>
            <p><b><subregion>${countryData.subregion}</subregion></b></p>
            <p><b><population>${countryData.population.toLocaleString()}</population></b></p>
            <p><b><area>${countryData.area.toLocaleString()} km²</area></b></p>
            <p><b><languages>${countryData.languages ? Object.values(countryData.languages).join(", ") : "N/A"}</languages></b></p>
            </div>
            `;
        })
        .catch(function(error) {
            console.log("country not found!!");
        });
});