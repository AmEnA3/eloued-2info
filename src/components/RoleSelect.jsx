import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

export default function RoleSelect() {
	const { setRole } = useRole();
	const navigate = useNavigate();

	function choose(role) {
		setRole(role);
		navigate('/');
	}

	return (
		<main className="container-page center-section">
			<m.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="card max-w-md mx-auto w-full"
			>
				<div className="card-body">
					<h1 className="text-2xl font-semibold mb-2">Choisissez votre rôle</h1>
					<p className="text-slate-300 mb-6">Sélectionnez « Étudiant » ou « Enseignant » pour personnaliser l’interface.</p>
					<div className="grid grid-cols-1 gap-3">
						<button onClick={() => choose('etudiant')} className="rounded-xl border border-purple-400 text-cyan-200 px-5 py-2.5 hover:bg-purple-500/20 hover:text-white shadow-glow transition-all duration-300">Étudiant</button>
						<button onClick={() => choose('enseignant')} className="rounded-xl border border-purple-400 text-cyan-200 px-5 py-2.5 hover:bg-purple-500/20 hover:text-white shadow-glow transition-all duration-300">Enseignant</button>
					</div>
				</div>
			</m.div>
		</main>
	);
}
