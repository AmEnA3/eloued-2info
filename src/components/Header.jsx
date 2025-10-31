import { NavLink, Link } from 'react-router-dom';

export default function Header() {
	return (
		<header className="fixed top-0 inset-x-0 z-50 h-16 bg-transparent backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-colors duration-300 ease-out">
			<div className="container-page relative h-16 flex items-center justify-center md:justify-end">
				<Link to="/" className="hidden sm:inline-flex absolute left-4 border border-purple-400 text-cyan-300 px-2 md:px-3 py-1 rounded-lg hover:bg-purple-500/20 hover:text-white transition-all duration-300 text-xs sm:text-sm">
					Home
				</Link>

				{/* Title: centered on small screens, static (in-flow) on md so it sits to the right with the nav */}
				<h1 className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none text-white font-semibold text-sm md:text-lg max-w-[85%] sm:max-w-[70%] px-4 sm:px-16 text-center truncate">
					Université d’El Oued – 2ème année Informatique
				</h1>

				{/* Navigation: hidden on very small screens so the title stays centered; shown from sm/md and aligned right on larger screens */}
				<nav className="hidden sm:flex items-center gap-2 md:gap-3">
					<NavLink to="/etudiants" className={({ isActive }) => `px-2 py-1 rounded text-xs sm:text-sm font-medium ${isActive ? 'text-cyan-300' : 'text-white/90 hover:text-cyan-300'}`}>
						Espace Étudiant
					</NavLink>
					<NavLink to="/enseignants" className={({ isActive }) => `px-2 py-1 rounded text-xs sm:text-sm font-medium ${isActive ? 'text-cyan-300' : 'text-white/90 hover:text-cyan-300'}`}>
						Espace Enseignant
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
