// script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Configuration for each dropdown
    const dropdownConfigs = {
        dropdown1: {
            url: 'http://localhost/GB/', // Endpoint for dropdown1
            populated: false // Flag to check if dropdown1 is populated
        },
        dropdown2: {
            url: 'http://localhost/GR/', // Endpoint for dropdown2
            populated: false // Flag to check if dropdown2 is populated
        },
        dropdown3: {
            url: 'http://localhost/GA/', // Endpoint for dropdown3
            populated: false // Flag to check if dropdown3 is populated
        }
    };

    // General function to fetch data and populate dropdown
    function fetchAndPopulateDropdown(dropdownId, url) {
        const config = dropdownConfigs[dropdownId];
        const loader = document.getElementById('loader');

        if (!config || config.populated) {
            return; // If config not found or already populated, exit the function
        }

        console.log(`Fetching data for ${dropdownId}...`);

        loader.style.display = 'block'; // Show loader

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(`Fetched data for ${dropdownId}:`, data);
                populateDropdown(dropdownId, data);
                config.populated = true; // Set the flag to true after populating
            })
            .catch(error => {
                console.error(`Error fetching data for ${dropdownId}:`, error);
                alert(`There was an error fetching data for ${dropdownId}: ` + error.message);
            })
            .finally(() => {
                loader.style.display = 'none'; // Hide loader
            });
    }

    // General function to populate dropdown
    function populateDropdown(dropdownId, data) {
        console.log('Populating dropdown:', dropdownId);
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = ''; // Clear existing options
        data.forEach(item => {
            const optionElement = document.createElement('div');
            optionElement.textContent = item;
            optionElement.addEventListener('click', function() {
                selectOption(dropdownId, item);
            });
            dropdown.appendChild(optionElement);
        });
        console.log('Dropdown populated:', dropdown);
    }

    // Function to select an option
    function selectOption(dropdownId, item) {
        const inputElement = document.getElementById(`${dropdownId}-input`);
        const selectedItems = inputElement.querySelectorAll('.selected-item');
        const selectedItemTexts = Array.from(selectedItems).map(el => el.textContent.trim());

        if (!selectedItemTexts.includes(item)) {
            const selectedItem = document.createElement('div');
            selectedItem.classList.add('selected-item');
            selectedItem.innerHTML = `${item} <span>&times;</span>`;
            selectedItem.querySelector('span').addEventListener('click', function() {
                selectedItem.remove();
                console.log(`${item} deselected`);
            });
            inputElement.appendChild(selectedItem);
            console.log(`${item} selected`);
        }
    }

    // Add event listeners to dropdown inputs
    Object.keys(dropdownConfigs).forEach(dropdownId => {
        const inputElement = document.getElementById(`${dropdownId}-input`);
        const dropdownElement = document.getElementById(dropdownId);

        inputElement.addEventListener('click', function() {
            dropdownElement.style.display = dropdownElement.style.display === 'block' ? 'none' : 'block';
            fetchAndPopulateDropdown(dropdownId, dropdownConfigs[dropdownId].url);
        });

        // Close the dropdown if clicked outside
        document.addEventListener('click', function(event) {
            if (!dropdownElement.contains(event.target) && !inputElement.contains(event.target)) {
                dropdownElement.style.display = 'none';
            }
        });
    });

    // Handle the submit button click
    document.getElementById('submit').addEventListener('click', function() {
        const selectedValues = {};
        Object.keys(dropdownConfigs).forEach(dropdownId => {
            const inputElement = document.getElementById(`${dropdownId}-input`);
            const selectedItems = inputElement.querySelectorAll('.selected-item');
            selectedValues[dropdownId] = Array.from(selectedItems).map(item => item.textContent.trim().slice(0, -2)); // Remove the cross mark
        });

        console.log('Selected values:', selectedValues);
        // You can send these selected values to your backend or process them as needed
    });
});
