# Auth0 - MERN Stack Mentorship Platform

A full stack web app designed based upon figma file given with authentication handled by Auth0. Backend is built Node.js (Express) connected to MongoDb Atlas via Mongoose and Frontend is build using React. 2 servers are built, one to serve the static files from React and another to handle all API authentication. In production, this is likely to be hosted on 2 separate servers to handle the traffic.

## Project Setup

```
docker build -t mono-mentorship .
docker run -dp 3000:3000 -p 3001:3001 mono-mentorship
```

## Configure credentials

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work or alternatively, use the default credentials provided

To do this, head to `src/auth-config.json` and replace the values from the one you gotten from Auth0

```{json}
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "audience": "{YOUR AUTH0 API_IDENTIFIER}",
  "clientID": "{YOUR AUTH0 CLIENT ID}"
}

```

## Deployment

### Compiles and minifies for production

```
# Run Docker on Prod Server and execute the Dockerfile
# Alternatively
npm run build
npm run prod
```

## What could be improved

1. Use of more robust state management like Redux
2. Writing test cases for codes and APIs
3. Better handling for authentication and user management
4. Use of better process manager instead of NPM

```

```
