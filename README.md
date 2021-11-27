# E-Commerce Admin Panel

### Prerequisite tools:
    1. yarn package manager
    2. node
    3. firebase-tools  ( yarn global add firebase-tools)

### Build Scripts
    "build": "react-scripts build"
    "build:test": "env-cmd -f .env.test react-scripts build"
    "build:preprod": "env-cmd -f .env.preprod react-scripts build"

### Tech Stack and Database

1. React
2. Firebase

### Firebase Deployments

##### To get token, run command:
```firebase login:ci```

Environment:

    - URL: <<URL>>
    - Email: <<email>>
    - Password: Ask Product Owner
    - Token: Look into ./service.sh file and if expired re-run above command with credentials and update new token
    - Firebase Json: ./firebase-preprod.json


### Deploy to firebase hosting using bash script
``` cd deployments && ./service.sh << prod|test|preprod >>```
