# Project Submission Notes

## Project Overview

This project is a dynamic Target Management Dashboard developed using Next.js. You can view the deployed application at [this link](https://main.d1exqf9281sv26.amplifyapp.com/).

- **Home Page**: 
  - Contains routes to the Dashboard and Track Changes pages.
  
- **Dashboard Page**:
  - **Bar Chart**: A bar chart summarizing the number of acquisition targets by pipeline status.
  - **Target Table**: A table listing all acquisition targets, grouped by pipeline status and sorted by last updated date descending. 
    - Supports sorting in ascending or descending order for both the name and timestamp columns.
  - **Global Filter**: Allows users to filter acquisition targets by pipeline status, affecting both the bar chart and table.
  - **Search by Name**: A search bar placeholder for filtering targets by their names.
  - **Editable Pipeline Status**: Users can change the pipeline status of a target directly from the table, with live updates reflecting the current timestamp.

- **Manage Page**:
  - Stores and tracks the history of changes made to the targets' statuses, allowing users to view past statuses and their corresponding timestamps.

## Additional Functionality
- The bar chart and table dynamically update based on the selected filters and search criteria.
- The target table supports pagination and allows sorting in ascending or descending order for both the name and timestamp columns.

## Database Integration
- **PostgreSQL**: The application is designed to store dates for inserting, updating, and retrieving data in a PostgreSQL database.
- **Deployment**: The application is deployed using AWS RDS for database connectivity.
- **API Endpoints**: API endpoints have been tested successfully in Postman, though minor issues were encountered during deployment. Due to time constraints, the database connectivity was removed for this submission but can be implemented in the future.

## Bonus Tasks
### Strategy for Managing Pipeline Status Changes
- **Data Management**: Changes to the pipeline statuses are managed in a JSON file (`data/targets.json`), which serves as the database.
- **Update Strategy**: Upon changing a target's status, the application immediately updates the timestamp and stores the previous status in the history array, allowing users to view past changes.

### Edge Cases
- **Empty State**: If no targets are available, the application displays a user-friendly message indicating that no data is available.
- **Invalid Data**: If the JSON file has invalid data or is inaccessible, the application handles errors gracefully, informing users of the issue without crashing.

## Suggestions for Further Improvements
- **User Authentication**: Implement user authentication to manage who can edit targets.
- **Data Persistence**: Consider re-integrating the PostgreSQL database for better data management and persistence.
- **Enhanced Filtering**: Implement more advanced filtering options (e.g., by date range) to allow users to refine their searches more effectively.
- **Performance Optimization**: Optimize the application for better performance, especially when dealing with a large number of targets.
  
Additionally, the entire project has been deployed on AWS Amplify, allowing us to monitor logs via CloudWatch for effective performance monitoring and troubleshooting.
