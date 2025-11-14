React integration files added in /frontend-react

Files:
- frontend-react/src/api.js         : apiFetch helper (reads REACT_APP_API_BASE or defaults to http://127.0.0.1:4000/api)
- frontend-react/src/components/Login.jsx
- frontend-react/src/components/Chat.jsx

How to use:
1. Copy the `src` folder contents into your React app's `src/` directory, or merge files:
   - api.js -> src/api.js
   - components/Login.jsx -> src/components/Login.jsx
   - components/Chat.jsx -> src/components/Chat.jsx

2. Install dependencies if not present (React app should already have react/react-dom).

3. Start your React app and ensure environment variable (optional):
   REACT_APP_API_BASE=http://127.0.0.1:4000/api

4. Use Login and Chat components in your app. Example (App.jsx):
   import React from 'react';
   import Login from './components/Login';
   import Chat from './components/Chat';
   function App(){
     return <div><Login /><Chat /></div>;
   }
   export default App;

Notes:
- Login stores token in localStorage under 'token'.
- apiFetch attaches the token automatically.
- You can extend patterns for bookings, forum, admin using apiFetch.
