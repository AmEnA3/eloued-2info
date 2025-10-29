import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function AnnouncementForm({ moduleId }) {
	const [teacherName, setTeacherName] = useState('');
	const [message, setMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		setSuccess('');
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
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-1">Nom de l’enseignant (optionnel)</label>
				<input
					type="text"
					value={teacherName}
					onChange={(e) => setTeacherName(e.target.value)}
					className="w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring-primary-500"
					placeholder="Ex: D. Amenna"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium mb-1">Message / Annonce</label>
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="w-full rounded-lg border-slate-300 focus:border-primary-500 focus:ring-primary-500"
					rows={3}
					
				/>
			</div>
			<div className="flex items-center gap-3">
				<button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
					{submitting ? 'Publication…' : 'Publier une annonce'}
				</button>
				{error && <span className="text-sm text-red-600">{error}</span>}
				{success && <span className="text-sm text-green-600">{success}</span>}
			</div>
		</form>
	);
}


