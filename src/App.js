import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import StudentsModules from './components/StudentsModules';
import TeacherDashboard from './components/TeacherDashboard';
import ModulePage from './components/ModulePage';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-full flex flex-col">
				<Header />
				<div className="flex-1">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/etudiants" element={<StudentsModules />} />
						<Route path="/enseignants" element={<TeacherDashboard />} />
						<Route path="/module/:moduleId" element={<ModulePage />} />
					</Routes>
				</div>
				<footer className="container-page py-8 text-center text-slate-500 text-sm">
					© {new Date().getFullYear()} Université d’El Oued — 2ème année Informatique
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
