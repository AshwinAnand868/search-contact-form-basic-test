# Contact Search Application

A simple and interactive application that enables users to search and filter contacts from a predefined list. The app is designed as a proof-of-concept, featuring a form-based search and dynamic filtering functionality for ease of use.

![Current UI Image](https://raw.githubusercontent.com/AshwinAnand868/search-contact-form-basic-test/refs/heads/main/ui-image.png)

---

## Features

- **Dynamic Contact Search**: Users can search for contacts by entering specific details (e.g., name, email, phone number) into the form.  
- **Predefined Data**: Static data is used for both contacts and Canadian states, making the app self-contained for testing purposes.  
- **Filter and Reset**: Users can refine their search or reset the form to view all contacts.  
- **Detailed Form and Results**: The app consists of a search form and a result display component for efficient contact management.

---

## File Structure

### **Main Form (`SearchPage`)**
- Contains the primary search functionality.
- A user-friendly form with input fields for attributes like name, email, phone number, etc.
- Integrates React Hook Form for form handling and validation.
- Utilizes Material-UI for date picking functionality.
- Allows users to filter contacts based on the entered information.

### **Results Component (`SearchResults`)**
- Displays the filtered results of the contact search.
- Offers an interactive way to select a contact, which updates the form inputs for further actions.
- Dynamically updates as the user adjusts search criteria.

### **Static Data**
- **Contacts**: Data used for search and filtering is stored in `data.json` for testing purposes.  
- **Canadian States**: A predefined list of Canadian states is stored in `hardcoded-canadian-states` for dropdown functionality.

---

## How to Set Up

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AshwinAnand868/search-contact-form-basic-test.git
   cd search-contact-form-basic-test
2. **Install Dependencies**
   ```bash
   npm install
3. **Run the Application**
   ```bash
   npm run dev
4. **Static Data**
   - **Contacts**: The data for contacts is stored in the data.json file. You can update this file to test with different datasets.
   - **Canadian States**: A list of Canadian states is stored in the hardcoded-canadian-states file and is used in the "State" dropdown in the form.

---

## Description
This app demonstrates the use of modern web development techniques such as React, TypeScript, React Hook Form, and Material-UI. It is a lightweight project designed to showcase form handling, validation, and filtering with static data.

---

## Further Possible Improvements
- Replace static data with API integration for real-time contact management
- Add unit tests for robust validation and coverage.
- Enhance UI with additional accessibility features and responsiveness.

---

## Contributing
Contributions are welcome! Please feel free to submit a pull request or raise an issue for discussion.
