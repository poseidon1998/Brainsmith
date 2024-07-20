// script.js

// Mock API URLs (replace with actual API URLs)
const apiUrl1 = 'https://api.example.com/endpoint1';
const apiUrl2 = 'https://api.example.com/endpoint2';
const apiUrl3 = 'https://api.example.com/endpoint3';
const submitApiUrl = 'https://api.example.com/submit';

// Fetch values for dropdowns
document.addEventListener('DOMContentLoaded', () => {
    fetchDropdownData(apiUrl1, 'dropdown1');
    fetchDropdownData(apiUrl2, 'dropdown2');
    fetchDropdownData(apiUrl3, 'dropdown3', true);
});

function fetchDropdownData(url, dropdownId, isMultiple = false) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById(dropdownId);
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.value;
                option.textContent = item.label;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Handle form submission
document.getElementById('submit').addEventListener('click', () => {
    const dropdown1 = document.getElementById('dropdown1').value;
    const dropdown2 = document.getElementById('dropdown2').value;
    const dropdown3 = Array.from(document.getElementById('dropdown3').selectedOptions).map(option => option.value);

    const payload = {
        dropdown1,
        dropdown2,
        dropdown3
    };

    fetch(submitApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error submitting data:', error));
});
