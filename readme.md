# My React Application

This is a simple React application.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v10 or higher)

## Prerequisites Installation

1. **Node.js:** If you don't have Node.js installed, download and install it from the [official Node.js website](https://nodejs.org/).

2. **npm:** npm is included with Node.js. However, it's a good practice to update npm to the latest version using the following command:
   ```sh
   npm install -g npm@latest


## Clone the Repository

1. Use the below command to clone the repository
    ```bash
    git clone https://HectadataMalaysia@dev.azure.com/HectadataMalaysia/GLCL%20SIF%20Platform/_git/React_Frontend -o upstream


## Installation and Setup Instructions


1. Navigate to the project directory:
    ```bash
    cd your-repo

2. Install dependencies: Currently using --force, later need to update package.json to include only necessary packages and fix remaining
    ```bash
    npm install --force

3. Install node-gyp globally (if not already installed):
    ```bash
    npm install -g node-gyp

4. Uninstall node-sass (if already installed):
    ```bash
    npm uninstall node-sass -f

5. Install react-scripts:
    ```bash
    npm i react-scripts


## Running the Application

Start the development server:

`npm start`  


## Accessing the Application

Open your browser and navigate to http://localhost:3000 to view the application.


## Debugger Setup for vscode
1. Click on the debugger icon on the left side of the vs code and create a launch.json
2. copy the below setup into the file
    ```bash
            {
                "version": "0.2.0",
                "configurations": [
                    {
                        "type": "chrome",
                        "request": "launch",
                        "name": "Launch Chrome against localhost",
                        "url": "http://localhost:3000",
                        "webRoot": "${workspaceFolder}"
                    }
                ]
            }
3. Run the debugger 