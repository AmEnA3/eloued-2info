import { Link, useParams } from 'react-router-dom';
import AnnouncementList from './AnnouncementList';
import { getModuleById } from '../data/modules';
import { useRole } from '../context/RoleContext';

export default function ModulePage() {
	const { moduleId } = useParams();
	const moduleData = getModuleById(moduleId);
	const { role } = useRole();

	if (!moduleData) {
		return (
			<main className="container-page py-10">
				<div className="text-slate-600">Module introuvable.</div>
			</main>
		);
	}

	return (
		<main className="container-page py-8 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-bold">{moduleData.title}</h1>
				<Link to="/etudiants" className="text-primary-700 hover:underline">← Retour aux modules</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-2 space-y-6">
					<section className="card">
						<div className="card-header">
							<h2 className="font-semibold">Ressources</h2>
						</div>
						<div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-medium mb-2">Cours (PDF)</h3>
								<ul className="list-disc list-inside space-y-1">
									{moduleData.resources.cours.map((r, i) => (
										<li key={i}><a href={r.url} target="_blank" rel="noreferrer" className="text-primary-700 hover:underline">{r.label}</a></li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="font-medium mb-2">TD / TP</h3>
								<ul className="list-disc list-inside space-y-1">
									{moduleData.resources.tdTp.map((r, i) => (
										<li key={i}><a href={r.url} target="_blank" rel="noreferrer" className="text-primary-700 hover:underline">{r.label}</a></li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="font-medium mb-2">YouTube</h3>
								<ul className="list-disc list-inside space-y-1">
									{moduleData.resources.youtube.map((r, i) => (
										<li key={i}><a href={r.url} target="_blank" rel="noreferrer" className="text-primary-700 hover:underline">{r.label}</a></li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="font-medium mb-2">Drive</h3>
								<ul className="list-disc list-inside space-y-1">
									{moduleData.resources.drive.map((r, i) => (
										<li key={i}><a href={r.url} target="_blank" rel="noreferrer" className="text-primary-700 hover:underline">{r.label}</a></li>
									))}
								</ul>
							</div>
						</div>
					</section>

					<section className="card">
						<div className="card-header">
							<h2 className="font-semibold">Annonces du Professeur</h2>
						</div>
						<div className="card-body space-y-6">
							<div>
								<h3 className="font-medium mb-2">Liste</h3>
								<AnnouncementList moduleId={moduleId} />
							</div>
						</div>
					</section>
				</div>
				<aside className="space-y-6">
					<div className="card">
						<div className="card-body">
							<h2 className="font-semibold mb-2">Informations</h2>
							<p className="text-slate-600 text-sm">Cette page regroupe les ressources et les annonces en temps réel pour le module {moduleData.title}.</p>
						</div>
					</div>
				</aside>
			</div>
		</main>
	);
}
