# Techno-Functional Document: Categorization App

 **Deployed the app via Netlify: https://streamlineinterest.netlify.app/**

 **To run the app locally, please follow the below commands**
 - npm install
 - npm run dev

## Development Approach

### Project Setup and Planning

- Successfully set up the development environment using **React** with **Vite** and **TypeScript**, **Tailwind CSS**, and necessary dependencies.
- Analyzed the project requirements for frontend integration.

### UI Design and Component Implementation

- Developed the user interface according to the specified requirements.
- Integrated the **Flowbite** design component library for pagination, loaders and other design components.
- Created the following screens:

  **Register Screen**  
  - Displays the fields to register a new user.
  - Implemented Formik error validation for real-time error validation on each input field, improving user input accuracy.
  - Displays a button to navigate to the LOGIN screen for existing users.
  - On successful registration, a verification email containing a unique **code** is sent to the user for account verification.
    
  **OTP Verification Screen**  
  - On successful registration, user is redirected to the OTP Verification screen.
  - Display the OTP input field.
  - Entering the valid code received in the mail will register the user successfully.

  **Login Screen**  
  - After OTP verification, user is navigated to the LOGIN screen.
  - Displays the Email and Password fields.
  - Implemented Formik error validation for real-time error validation on each input field, improving user input accuracy.

  **Categories Screen**  
  - Displays the **list of categories** fetched from the backend.
  - User can select or deselect the categories based on their interest.
  - Implemented **Pagination** to display 6 categories per page for better organization and readability.
  - Includes a **Submit** button to save the latest category selections to the database, as well as a **Logout** button to logout the user.

**Header**  
  - Implemented a static header which will be displayed across all the screens.
    
**Toast Notifications**  
  - Implemented toast messages for every action performed to provide proper user feedback.

- Developed common components for **Text Input**, **Header**, and **Toast** to promote code reusability and maintainability.
- Ensured the interface is responsive and user-friendly, maintaining high code quality and readability.

### API Integration and Authentication

- Analysed and integrated backend and database using **Node**, **Express** and **MongoDB** and created APIs for Register, OTP Verification, Login, Fetch categories, and Update Categories.
- Integrated **Axios** to connect the app with the Backend Database API.
- Implemented error handling for a robust application experience.

### Testing

- Conducted thorough testing across multiple browsers and screen sizes.
- Verified the app's functionality, user interface, and responsiveness.

### Bug Fixes and Improvements

- Resolved issues identified during testing and fixed any bugs.
- Fine-tuned the user interface to enhance the overall user experience.

### Coding Standards

- Adhered to proper naming conventions and organized folder structure.
- Included comments where necessary for clarity.
- Implemented reusable components and common utilities.
- Committed and pushed changes using conventional commits.
