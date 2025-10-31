import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useRole } from '../context/RoleContext';

export default function AnnouncementForm({ moduleId, moduleTitle = '' }) {
	const { role } = useRole();
	const [teacherName, setTeacherName] = useState('');
	const [message, setMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (role !== 'enseignant') {
			setError('Vous devez être connecté en tant qu\'enseignant pour publier.');
			return;
		}
		if (!moduleId) {
			setError('Veuillez sélectionner un module.');
			return;
		}
		if (!message.trim()) {
			setError('Le message est obligatoire.');
			return;
		}
		setSubmitting(true);
		try {
			await addDoc(collection(db, 'announcements'), {
				moduleId,
				moduleTitle: moduleTitle || '',
				teacherName: teacherName.trim() || 'Enseignant',
				message: message.trim(),
				createdAt: serverTimestamp(),
			});
			setMessage('');
			setSuccess('Annonce publiée.');
		} catch (err) {
			setError("Échec de publication. Veuillez réessayer.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<div>
				<label className="block text-sm font-medium mb-1">Nom de l’enseignant (optionnel)</label>
				<input
					type="text"
					value={teacherName}
					onChange={(e) => setTeacherName(e.target.value)}
					className="w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring-primary-500"
					placeholder="Ex: D. Amenna"
					disabled={role !== 'enseignant'}
				/>
			</div>

			<div className="flex gap-3 items-start">
				<div className="flex-1">
					<label className="block text-sm font-medium mb-1">Message / Annonce</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring-primary-500 resize-none"
						rows={4}
						disabled={role !== 'enseignant'}
					/>
				</div>
				<div className="w-40 flex-shrink-0 flex flex-col items-end">
					<div className="text-xs text-slate-400 mb-2">Module sélectionné</div>
					<div className="mb-3 text-sm font-medium text-slate-200">{moduleTitle || moduleId}</div>
					<button type="submit" disabled={submitting || role !== 'enseignant'} className="btn-primary w-full disabled:opacity-70">
						{submitting ? 'Publication…' : 'Publier'}
					</button>
				</div>
			</div>

			<div className="flex items-center gap-3">
				{error && <span className="text-sm text-red-600">{error}</span>}
				{success && <span className="text-sm text-green-600">{success}</span>}
				{role !== 'enseignant' && <span className="text-sm text-slate-400 ml-auto">Vous n'êtes pas en mode enseignant — passez en mode <strong>enseignant</strong> pour publier.</span>}
			</div>
		</form>
	);
}




