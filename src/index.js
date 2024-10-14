import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import { UserProvider } from './components/UserContext'; // Ensure this path is correct

const rootElement = document.getElementById('root'); // Get the root element
const root = createRoot(rootElement); // Create a root

root.render(
    <UserProvider>
        <App />
    </UserProvider>
);
