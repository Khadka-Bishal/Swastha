# Swastha

## Project Description
This project aims to improve healthcare access in rural areas through technology. This offline-first application enables healthcare workers to manage patient records, conduct telemedicine sessions, and provide essential healthcare services in areas with limited internet connectivity.

## API Usage
We have used OnDemand Chat API for chat response and Firebase API for authentication. They were hardcoded for testing purposes but the corresponding API keys have been deleted and are inaccessible.

## Usage Guidelines
To clone this project:
    ```
    git clone https://github.com/Khadka-Bishal/Swastha.git
    ```

For use alongside the diagnosis model at https://github.com/abhigyak47/ml-api .
For use alongside the chatbot at https://github.com/abhigyak47/heart-app . Please follow the instructions included in each of them to set them up.


To set up and run this application:

1. Install Vite:
   In your project directory, run the following command to install all necessary dependencies:

   npm install

2. Run the application:
   After installation is complete, start the development server with:

   npm run dev

This will launch the application locally, typically accessible at http://localhost:5173.



## Team Members and Roles
- **Tareq**: Biomedical engineer
- **Abhigya**: ML Model + Chatbot developer
- **Bishal**: Fullstack Developer, UI/UX Designer
  
## OnDemand API Utilization
This project utilizes the OnDemand API to create the chatbot and get responses. More specifically, it makes use of the OnDemand gpt 4o endpoint for the chatbot, along with agents such as Health Chat, Email Agent, Twilio, Global Knowledge Agent to provide specialized health information and send your diagnosis to your doctor.
On a side note, we've also made use of BYOI for the CNN model predicting the heartbeat diagnosis.


