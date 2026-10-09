# React Chat App

A beginner-friendly React chat interface built with Vite.

## Features
- Send messages with the Send button or Enter.
- Each message gets a random username (Alan, Bob, Carol, Dean, or Elin).
- Like and unlike messages; the count updates.
- Add emojis and mention a user.
- Responsive layout for mobile and desktop.

Messages are kept in React state and disappear when the page is refreshed. This is a front-end demo, not a live multi-user chat server.

## Run locally
1. Install the current **Node.js LTS** from https://nodejs.org/
2. Extract this ZIP and open the `react-chat-app` folder in VS Code.
3. Open the terminal in that folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown in the terminal, usually `http://localhost:5173`.

If PowerShell says `npm` is not recognized, install Node.js LTS, close and reopen VS Code/PowerShell, then run `node -v` and `npm -v` before trying again.

## Build
```bash
npm run build
```

## Upload to GitHub
Create an empty GitHub repository, then run these commands in the project folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Create React chat app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
