#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build

# The build command in package.json includes both frontend and backend building
# No need for additional steps