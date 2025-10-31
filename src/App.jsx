import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Header from './components/Header';
import { RoleProvider } from './context/RoleContext';
import { AnnouncementsProvider } from './context/AnnouncementsContext';
import RoleSelect from './components/RoleSelect';
import Home from './components/Home';
import StudentsModules from './components/StudentsModules';
import TeacherDashboard from './components/TeacherDashboard';
import ModulePage from './components/ModulePage';
import Modules from './components/Modules';
import ModuleDetails from './components/ModuleDetails';
import AnnouncementsPage from './components/AnnouncementsPage';
import './App.css';
import Footer from './components/Footer';

function App() {
	return (
		<LazyMotion features={domAnimation}>
			<BrowserRouter>
				<RoleProvider>
				<AnnouncementsProvider>
				<div className="min-h-full flex flex-col font-sans">
					<Header />
					<div className="header-spacer" />
					<m.main
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, ease: 'easeOut' }}
						className="flex-1"
					>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/role" element={<RoleSelect />} />
							<Route path="/etudiants" element={<StudentsModules />} />
							<Route path="/annonces" element={<AnnouncementsPage />} />
						<Route path="/modules" element={<Modules />} />
						<Route path="/modules/:slug" element={<ModuleDetails />} />
							<Route path="/enseignants" element={<TeacherDashboard />} />
							<Route path="/module/:moduleId" element={<ModulePage />} />
						</Routes>
					</m.main>
					<Footer />
				</div>
				</AnnouncementsProvider>
				</RoleProvider>
			</BrowserRouter>
		</LazyMotion>
	);
}

export default App;
