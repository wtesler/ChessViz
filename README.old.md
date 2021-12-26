# MIVIE Frontend

### Architecture
This is a React website built with `react-scripts`.

### Getting started
Run `npm install`
Then run `npm run start`

### React Components
The React component structure is the same as the directory structure in `src/Components`
starting at `Root`.

### Hosting
Firebase Hosting is used.

### Setup Firebase CLI

Download firebase cli

`firebase login` to login

`firebase use <PROJECT_ID>` to switch to the proper project

### How Dependency Injection works

Modules provide Dependency-Injection. They are component-scoped.
For example, the DashboardModule provides objects to all nested children
which exist inside the DashboardScreen component.

Access the objects of a module by wrapping your component in `withModule.js`
and access `props.module`.

### Run the website locally
```
npm run start
```

### Build the website
```
npm run build
```

### Deploy to Firebase
```
firebase deploy
```

You need to **build** before **deploying**.

### REST Network calls
[superagent](https://github.com/visionmedia/superagent)
is the networking library used.
