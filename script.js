document.addEventListener("DOMContentLoaded", () => {
    const customerList = document.getElementById("customerList");
    const itemList = document.getElementById("itemList");

    // Function to fetch customers
    function fetchCustomers() {
        fetch("http://localhost:3000/customers")
            .then(response => response.json())
            .then(customers => {
                customerList.innerHTML = customers.map(customer => `
                    <li>
                        <strong>Name:</strong> ${customer.name}<br>
                        <strong>Location:</strong> ${customer.location}<br>
                        <strong>Pick-up Time:</strong> ${new Date(customer.pickupTime).toLocaleString()}<br>
                        <strong>Delivery Time:</strong> ${new Date(customer.deliveryTime).toLocaleString()}<br>
                        <button class="delete-btn" onclick="deleteCustomer(${customer.id})">Delete</button>
                    </li>
                `).join("");
            })
            .catch(error => console.error("Error fetching customers:", error));
    }

    // Display item price list
    function displayPriceList() {
        const items = [
            { name: "Pillow", price: 150 },
            { name: "Small Basket Laundry", price: 350 },
            { name: "Duvet", price: 400 },
            { name: "Fluffy Carpet", price: 500 },
            { name: "Shoes (per pair)", price: 80 },
            { name: "Curtains (2)", price: 150 }
        ];

        itemList.innerHTML = items.map(item => `
            <li>
                <strong>${item.name}:</strong> Ksh${item.price}
            </li>
        `).join("");
    }

    // Fetch customers and display item price list on page load
    fetchCustomers();
    displayPriceList();

    // Handle form submission to add a new customer
    const addCustomerForm = document.getElementById("addCustomerForm");
    addCustomerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(addCustomerForm);
        const newCustomer = {
            name: formData.get("name"),
            location: formData.get("location"),
            pickupTime: formData.get("pickupTime"),
            deliveryTime: formData.get("deliveryTime")
        };

        fetch("http://localhost:3000/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("New customer added:", data);
            // Optionally display a success message or update UI
            addCustomerForm.reset(); // Clear the form
            fetchCustomers(); // Refresh customer list after adding
        })
        .catch(error => {
            console.error("Error adding customer:", error);
            // Optionally display an error message to the user
        });
    });

    // Function to delete a customer
    window.deleteCustomer = function(id) {
        fetch(`http://localhost:3000/customers/${id}`, {
            method: "DELETE"
        })
        .then(() => fetchCustomers()) // Refresh customer list after deletion
        .catch(error => console.error("Error deleting customer:", error));
    };
});

function cb05() {
    console.log("Button clicked!");
}

// Optionally, attach event listener programmatically instead of using inline HTML attribute
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#myButton");
    button.addEventListener("click", cb05);
});
