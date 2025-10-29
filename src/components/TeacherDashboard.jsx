import { useState } from 'react';
import AnnouncementForm from './AnnouncementForm';
import { modulesCatalog } from '../data/modules';

export default function TeacherDashboard() {
	const [selectedModule, setSelectedModule] = useState(modulesCatalog[0]?.id || '');

	return (
		<main className="container-page py-8 space-y-6">
			<h1 className="text-2xl md:text-3xl font-bold">Espace Enseignant</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="card md:col-span-1">
					<div className="card-body space-y-3">
						<label className="block text-sm font-medium">Sélectionnez votre module</label>
						<select
							className="w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring-primary-500"
							value={selectedModule}
							onChange={(e) => setSelectedModule(e.target.value)}
						>
							{modulesCatalog.map((m) => (
								<option key={m.id} value={m.id}>{m.title}</option>
							))}
						</select>
						<p className="text-xs text-slate-500">Vos annonces seront visibles immédiatement par les étudiants de ce module.</p>
					</div>
				</div>
				<div className="card md:col-span-2">
					<div className="card-header">
						<h2 className="font-semibold">Publier une annonce</h2>
					</div>
					<div className="card-body">
						<AnnouncementForm moduleId={selectedModule} />
					</div>
				</div>
			</div>
		</main>
	);
}


