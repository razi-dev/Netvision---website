 NetVision – Real-Time Network Analyzer (Frontend)

A modern React-based web application that displays real-time network quality, internet speed visualization, and user measurement history as part of the NetVision project.

This application is deployed on Firebase Hosting with GitHub Actions CI/CD for automated builds and deployments.

 Live Demo--------------------------

🔗 Hosted URL:
https://netvision-95.web.app

Repository--------------------------------------

GitHub Repo:
https://github.com/razi-dev/Netvision---website

🛠 Tech Stack-------------------------------

React (Create React App)

JavaScript (ES6+)

CSS / Tailwind / Custom styles

Firebase Hosting

GitHub Actions (CI/CD)

 Project Setup------------------------------------
1 .Clone the Repository
git clone https://github.com/razi-dev/Netvision---website.git
cd Netvision---website/frontend

2️. Install Dependencies
npm install

3️. Run in Development Mode
npm start


Runs the app locally at
http://localhost:3000/

4️. Create Production Build
npm run build


The output will be saved in:

frontend/build

 Firebase Hosting Setup-----------------------------------------

The project uses Firebase Hosting to serve the production build.

firebase.json used:
{
  "hosting": {
    "public": "frontend/build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}

 CI/CD Pipeline (GitHub Actions)-------------------------------------------------

Every push to the master branch triggers the GitHub workflow:

Installs dependencies

Builds the React app

Deploys to Firebase Hosting automatically

Workflow file: .github/workflows/firebase-hosting-merge.yml
name: Firebase Hosting CI/CD

on:
  push:
    branches:
      - master

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js 18
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build React App
        working-directory: ./frontend
        run: npm run build

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT_NETVISION_95 }}"
          channelId: live
          projectId: netvision-95

 Features-----------------------------------------

-- Real-time internet quality visualization

-- Heatmap-style UI (planned or implemented by backend)

-- User measurement history display

-- Login/Authentication (if implemented)

-- Clean and modern UI

-- Folder Structure
Netvision---website/
│
├── frontend/        # React application source code
│   ├── public/
│   ├── src/
│   ├── build/       # Production build (auto-generated)
│   └── package.json
│
├── firebase.json    # Firebase hosting configuration
└── .github/
    └── workflows/   # CI/CD configuration files

-- Contribution

Pull requests and improvements are welcome.

-- License

This project is maintained as part of an internship assignment.
