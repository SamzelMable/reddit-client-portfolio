Reddit Client

A React-based Reddit client application that lets users browse subreddits, view posts, search with live subreddit suggestions, and read post details with comments.

The backend is built with Node.js & Express and is hosted on Render, while the frontend is hosted on GitHub Pages.

🌟 Features

Browse popular subreddits by default

Live subreddit search suggestions like Google

View posts with:

Images

Upvotes

Number of comments

Click on a post to view:

Full post content

Comments with authors

Back button support to return to the previous subreddit

Skeleton UI for loading posts and comments

Fully responsive for desktop and mobile

Reddit OAuth for API requests

🛠 Technologies Used

Frontend:

React

Redux & Redux Toolkit

React Router

CSS Modules

Backend:

Node.js & Express

Axios & node-fetch

Reddit API with OAuth2 authentication

Deployment:

Frontend: GitHub Pages

Backend: Render

🗂 Project Structure
reddit-client/
│
├─ client/                # React frontend
│  ├─ src/
│  │  ├─ components/      # PostCard, PostList, SearchBar, Skeletons
│  │  ├─ features/        # Redux slices
│  │  └─ App.js
│  └─ package.json
│
└─ server/                # Node/Express backend
   ├─ routes/             # API routes
   ├─ controllers/        # Route handlers
   ├─ services/           # Reddit API service functions
   ├─ server.js
   └─ package.json

🚀 Getting Started
Prerequisites

Node.js v18+

npm

Git

Frontend Setup

Navigate to the client folder:

cd client


Install dependencies:

npm install


Run locally:

npm start

Backend Setup

Navigate to the server folder:

cd server


Install dependencies:

npm install


Create a .env file with:

REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
PORT=5000


Run locally:

npm run dev

🌐 Deployment

Frontend: Push the client/build folder to GitHub and host on GitHub Pages.

Backend: Deploy the server folder on Render as a separate service.

Important: Update the frontend API base URL to point to the Render server:

const API_BASE_URL = 'https://reddit-client-portfolio.onrender.com/api';

📡 API Endpoints
Method	Endpoint	Description
GET	/api/subreddit/:subreddit	Fetch posts for a subreddit
GET	/api/post/:postId	Fetch post details and comments
GET	/api/search-subreddits?q=	Fetch subreddit suggestions

🎯 Usage

Open the app in a browser.

Type a subreddit name in the search bar – suggestions will appear.

Click a suggestion or hit enter to fetch posts.

Click on a post to see details and comments.

Use the back button to return to the previous subreddit.

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a branch (git checkout -b feature/my-feature)

Commit your changes (git commit -m "Add feature")

Push (git push origin feature/my-feature)

Open a Pull Request

📄 License

MIT License
