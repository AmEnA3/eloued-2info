import { NavLink, Link } from 'react-router-dom';

export default function Header() {
	return (
		<header className="fixed top-0 inset-x-0 z-50 bg-transparent shadow-[0_0_10px_rgba(168,85,247,0.3)]">
			<div className="container-page relative h-16 flex items-center justify-center">
				<Link to="/" className="absolute left-4 border border-purple-400 text-cyan-300 px-2 md:px-3 py-1 rounded-lg hover:bg-purple-500/20 hover:text-white transition-all duration-300 text-xs sm:text-sm">
					Home
				</Link>
				<h1 className="text-white font-semibold text-sm md:text-lg max-w-[70%] px-16 mx-auto text-center truncate">Université d’El Oued – 2ème année Informatique</h1>
				<nav className="absolute right-4 flex items-center gap-2 md:gap-3">
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
