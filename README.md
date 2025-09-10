# Kusto Learning Docs

This is a simple static website for Kusto learning materials. The site is hosted on Azure Static Web Apps and is automatically updated when changes are pushed to the `main` branch of this GitHub repository.

## How to Update the Website

1.  **Make Changes Locally**: Edit the `index.html` file to update the content of the website.
2.  **Stage Your Changes**: Open a terminal in the project directory and run the following command to stage your changes:
    ```bash
    git add .
    ```
3.  **Commit Your Changes**: Commit the staged files with a descriptive message:
    ```bash
    git commit -m "Your descriptive message about the changes"
    ```
4.  **Push to GitHub**: Push your commit to the `main` branch on GitHub. This will automatically trigger the deployment to the Azure Static Web App.
    ```bash
    git push
    ```

Your changes will be live within a few minutes. You can check the deployment status in the "Actions" tab of this GitHub repository.