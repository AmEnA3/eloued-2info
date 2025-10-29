import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

export default function Home() {
	return (
		<main className="container-page center-section">
			<m.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className="mb-8"
			>
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 drop-shadow">Welcome to the 2nd year of computer science</h1>
				<p className="text-slate-300 max-w-xl mx-auto px-4">Plateforme moderne pour partager les ressources et les annonces en temps réel.</p>
			</m.div>

			<div className="w-full max-w-2xl mx-auto grid grid-cols-1 gap-5 sm:gap-6">
				<m.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className="card hover:shadow-glowLg transition max-w-md mx-auto w-full"
				>
					<div className="card-body">
						<h2 className="text-xl font-semibold mb-2">Espace Étudiant</h2>
						<p className="text-slate-300 mb-4">Consultez les modules, ressources (Cours, TD/TP) et les « Annonces du Professeur ».</p>
						<Link to="/etudiants" className="btn-primary">Accéder</Link>
					</div>
				</m.div>
				<m.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.55, ease: 'easeOut' }}
					className="card hover:shadow-glowLg transition max-w-md mx-auto w-full"
				>
					<div className="card-body">
						<h2 className="text-xl font-semibold mb-2">Espace Enseignant</h2>
						<p className="text-slate-300 mb-4">Publiez des annonces par module. Elles seront visibles immédiatement par les étudiants.</p>
						<Link to="/enseignants" className="btn-outline">Publier une annonce</Link>
					</div>
				</m.div>
			</div>
		</main>
	);
}
