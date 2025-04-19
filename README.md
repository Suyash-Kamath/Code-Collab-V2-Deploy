# Code Collab - Real-Time Collaborative Coding Platform

## Overview
**Code Collab** is a real-time collaborative coding platform built using the **MERN stack**. It enables multiple users to write and edit code simultaneously with live updates. The project utilizes **Socket.IO** for real-time communication and includes a **drawing feature powered by tldraw** for enhanced collaboration.

## Features
- **Real-Time Code Collaboration** - Multiple users can code together in real-time.
- **MERN Stack Implementation** - Built using MongoDB, Express.js, React.js, and Node.js.
- **WebSockets with Socket.IO** - Ensures instant synchronization between clients.
- **Integrated Drawing Feature** - Uses tldraw for visual collaboration.
- **User Authentication** - Secure login and session handling.
- **Multiple Language Support** - Users can write and execute code in different (20+) programming languages.
- **Code History & Version Control** - Tracks changes made to the code in real-time.
- **Dark & Light Mode and 10+** - User-friendly theme customization.

## Tech Stack
- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js

- **Real-time Communication**: Socket.IO
- **Drawing Feature**: tldraw
- **Ports Used**:
  - **Server**: Runs on `PORT 5000`
  - **Client**: Runs on `PORT 5173`

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)


### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/Suyash-Kamath/Code-Collab-V2.git
   cd Code Collab
   ```
2. **Setup Backend**
   ```sh
   cd server
   npm install
   npm start
   ```
3. **Setup Frontend**
   ```sh
   cd ../client
   npm install
   npm run dev
   ```
4. **Access the Application**
   Open `http://localhost:5173` in your browser.




## Screenshots
Here are some preview images showcasing the platform:

1. **Home Page** - Overview of the platform.
![Landing page](/client/public/ss/landingpage.png)

2. **Live Coding Environment** - Real-time code synchronization.

3. **Drawing Feature** - Collaborative sketching using tldraw.

4. **User Authentication** - Secure login and registration.

5. **Version Control** - Track changes and revert code edits.

![Screenshot 1](/client/public/ss/step-1.png)
![Screenshot 2](/client/public/ss/step-2.png)
![Screenshot 3](/client/public/ss/step-3.png)
![Screenshot 4](/client/public/ss/step-4.png)
![Screenshot 5](/client/public/ss/step-5.png)
![Screenshot 6](/client/public/ss/step-6.png)
![Screenshot 7](/client/public/ss/step-7.png)

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.



## Contact
For queries or collaborations, reach out via email: `suyashkamath9@gmail.com`

