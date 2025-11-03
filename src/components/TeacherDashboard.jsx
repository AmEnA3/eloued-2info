import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnnouncementForm from './AnnouncementForm';
import { modulesCatalog } from '../data/modules';
import { useRole } from '../context/RoleContext';

export default function TeacherDashboard() {
	const [selectedModule, setSelectedModule] = useState(modulesCatalog[0]?.id || '');
	const { role, setRole } = useRole();
	const navigate = useNavigate();

	useEffect(() => {
		const isTeacher = localStorage.getItem('isTeacher') === 'true';
		if (!isTeacher) {
			navigate('/login-enseignant');
			return;
		}
		if (setRole) setRole('enseignant');
	}, [setRole, navigate]);

	const handleLogout = () => {
		localStorage.removeItem('isTeacher');
		navigate('/');
	};

	return (
		<main className="container-page py-8 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl md:text-3xl font-bold">Espace Enseignant</h1>
				<button
					onClick={handleLogout}
					className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
				>
					Se déconnecter
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="card md:col-span-1">
					<div className="card-body space-y-3">
						<label className="block text-sm font-medium">Sélectionnez votre module</label>
						<select
							className="custom-select w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring-primary-500"
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
						<AnnouncementForm moduleId={selectedModule} moduleTitle={modulesCatalog.find(m => m.id === selectedModule)?.title || ''} />
					</div>
				</div>
			</div>
		</main>
	);
}





