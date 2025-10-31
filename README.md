# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Architecture

This section explains the high-level architecture, main components, data flow and environment expectations for the project.

### Purpose
- Centralized learning portal for "Université d’El Oued – 2ème année Informatique".
- Students browse modules and resources (PDFs, TD/TP, YouTube, Drive links).
- Teachers post real-time announcements per module (stored in Firestore).

### Tech stack
- React (Create React App) — SPA root and routing.
- React Router — client-side routing for pages and module routes.
- Tailwind CSS — utility-first styling (see `src/index.css`, `tailwind.config.js`).
- Framer Motion — animations and transitions.
- Firebase Firestore — real-time announcements (see `src/firebase.js`).

### High-level structure
- public/
	- Static assets and course PDFs under `public/pfds/...`.
- src/
	- `App.jsx` — root component, routing, and app layout (Header, Footer).
	- `index.css` — Tailwind directives and shared utility classes (cards, buttons, header spacer).
	- `firebase.js` — Firebase initialization (reads env vars prefixed with `REACT_APP_`).
	- `context/RoleContext.jsx` — simple role provider (student/teacher) persisted in localStorage.
	- `data/modules.js` — static modules catalog (IDs, titles, resource links) and helper `getModuleById`.
	- `components/` — UI components and pages (Header, Home, StudentsModules, ModulePage, AnnouncementForm, AnnouncementList, etc.).

### Routing / pages
- `/` — Home (landing page with links to student / teacher areas).
- `/etudiants` — Student modules listing (grid of modules).
- `/module/:moduleId` — Module detail page (resources + announcements).
- `/enseignants` — Teacher dashboard (publish announcements).

### Data flow
- Static resources: module metadata lives in `src/data/modules.js` and links to static PDFs in `public/pfds`.
- Announcements: UI components use Firestore directly:
	- `AnnouncementForm` uses `addDoc(collection(db, 'announcements'), {...})` with `serverTimestamp()`.
	- `AnnouncementList` listens with `onSnapshot(query(... where('moduleId','==', moduleId) ...))` to stream real-time updates.
	- `updateDoc` and `deleteDoc` are used to edit and remove announcements.

### State & access control
- `RoleContext` stores a client-side role (`'etudiant'` or `'enseignant'`) and persists it to `localStorage`.
- The role controls UI features only (e.g., showing the announcement form or edit/delete controls). There is no server-side authentication in the current implementation — switching to `enseignant` is purely client-side.

### Environment variables
Create a `.env` file (not committed) containing Firebase credentials named like:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

### How to run
1. npm install
2. npm start

### Operational notes & suggestions
- Authentication: add Firebase Auth (or another provider) to securely identify teachers and prevent unauthorized posting/deleting of announcements.
- Modules source: consider moving `modules.js` to a Firestore collection or a small CMS if non-developers need to edit resources.
- Responsive/Accessibility: continue testing on small screens and add semantic ARIA attributes where helpful.
- Tests: add unit and integration tests for announcement behavior and routing. The project already includes testing libraries in `package.json`.
- Production build: `npm run build` produces an optimized bundle (CRA).

### Small contract (inputs/outputs, success)
- Inputs: environment variables (Firebase config); static `modules.js` for catalog entries; optional teacher-provided announcement content.
- Outputs: static pages, Firestore documents in `announcements` collection, and real-time UI updates for connected clients.
- Success criteria: students can view resources and announcements; teachers can post/edit/delete announcements and changes are visible to students in real time.

If you'd like, I can also add a generated component tree diagram or a separate `docs/ARCHITECTURE.md` with a diagram and example Firestore rules for production.
