import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { m } from 'framer-motion';
import { findModuleBySlug } from '../data/modulesCatalog';
import { useRole } from '../context/RoleContext';
import AnnouncementList from './AnnouncementList';
import AnnouncementForm from './AnnouncementForm';

export default function ModuleDetails() {
	const { slug } = useParams();
	const moduleDef = findModuleBySlug(slug);
	const { role } = useRole();
	const [infoExpanded, setInfoExpanded] = useState(false);

	if (!moduleDef) {
		return (
			<main className="container-page center-section">
				<div className="text-slate-400">Module introuvable.</div>
			</main>
		);
	}

	return (
		<main className="container-page center-section">
			<m.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="w-full max-w-3xl mx-auto space-y-6"
			>
			<div className="text-center">
				<h1 className="text-3xl font-bold">{moduleDef.title}</h1>
				<p className="text-slate-300 mt-2 max-w-2xl mx-auto">{moduleDef.description}</p>
				
				<div className="mt-6 max-w-2xl mx-auto">
					<button
						onClick={() => setInfoExpanded(!infoExpanded)}
						className="card w-full text-left hover:shadow-glowLg transition cursor-pointer"
					>
						<div className="card-body">
							<h3 className="font-semibold flex items-center gap-2">
								<span>ℹ️</span>
								<span>Informations</span>
							</h3>
							{infoExpanded && moduleDef.info && (
								<p className="text-slate-300 mt-3">{moduleDef.info}</p>
							)}
						</div>
					</button>
				</div>

				<Link to="/modules" className="inline-block mt-4 text-cyan-300 hover:text-white transition">← Retour aux modules</Link>
			</div>

				<section className="card">
					<div className="card-header">
						<h2 className="font-semibold">Annonces</h2>
					</div>
					<div className="card-body space-y-6 text-left">
						{role === 'enseignant' && (
							<div>
								<h3 className="font-medium mb-2">Publier une annonce</h3>
								<AnnouncementForm moduleId={slug} />
							</div>
						)}
						<div>
							<h3 className="font-medium mb-2">Dernières annonces</h3>
							<AnnouncementList moduleId={slug} />
						</div>
					</div>
				</section>
			</m.div>
		</main>
	);
}
