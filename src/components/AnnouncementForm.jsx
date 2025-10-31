import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRole } from '../context/RoleContext';
import { useAnnouncements } from '../context/AnnouncementsContext';

export default function AnnouncementForm({ moduleId, moduleTitle = '' }) {
	const { role } = useRole();
	const [teacherName, setTeacherName] = useState('');
	const [message, setMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [announcements, setAnnouncements] = useState([]);
	const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
	const { getAnnouncementsForModule } = useAnnouncements();
	const [editingId, setEditingId] = useState(null);
	const [editMessage, setEditMessage] = useState('');

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
			// the global provider will sync; refresh the local view too for immediate feedback
			setAnnouncements(getAnnouncementsForModule(moduleId));
		} catch (err) {
			setError("Échec de publication. Veuillez réessayer.");
		} finally {
			setSubmitting(false);
		}
	}

	useEffect(() => {
		// read announcements for this module from the global provider (keeps it realtime)
		setLoadingAnnouncements(true);
		setAnnouncements(getAnnouncementsForModule(moduleId));
		setLoadingAnnouncements(false);
	}, [moduleId, getAnnouncementsForModule]);

	async function saveEdit(id) {
		if (role !== 'enseignant') return;
		try {
			const ref = doc(db, 'announcements', id);
			await updateDoc(ref, { message: editMessage });
			setEditingId(null);
			setEditMessage('');
			setAnnouncements(getAnnouncementsForModule(moduleId));
		} catch (err) {
			console.error('Failed to save edit', err);
		}
	}

	async function removeAnnouncement(id) {
		if (role !== 'enseignant') return;
		try {
			const ref = doc(db, 'announcements', id);
			await deleteDoc(ref);
			setAnnouncements(getAnnouncementsForModule(moduleId));
		} catch (err) {
			console.error('Failed to delete announcement', err);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="teacher-announce-form space-y-3">
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

			{/* Announcements list (fetched after publish) */}
			<section className="mt-4">
				{loadingAnnouncements ? (
					<div className="text-slate-500">Chargement des annonces…</div>
				) : announcements.length === 0 ? (
					<div className="text-slate-500">Aucune annonce pour le moment.</div>
				) : (
					<ul className="space-y-3">
						{announcements.map((a) => (
							<li key={a.id} className="p-4 rounded-lg bg-white/10 border border-white/10 backdrop-blur">
								<div className="flex items-start justify-between gap-4">
									<div className="text-left">
										<p className="font-medium">{a.teacherName || 'Enseignant'}</p>
											{editingId === a.id ? (
												<textarea className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 mt-2" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} rows={3} />
											) : (
												<p className="text-slate-200 mt-1">{a.message}</p>
											)}
									</div>
									<div className="text-xs text-slate-400 whitespace-nowrap text-right">
										{a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : ''}
									</div>
								</div>
									{role === 'enseignant' && (
										<div className="mt-3 flex gap-2 justify-end">
											{editingId === a.id ? (
												<>
													<button onClick={() => saveEdit(a.id)} className="px-3 py-1 rounded-lg border border-purple-400 text-cyan-200 hover:bg-purple-500/20 transition">Enregistrer</button>
													<button onClick={() => { setEditingId(null); setEditMessage(''); }} className="px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10 transition">Annuler</button>
												</>
											) : (
												<>
													<button onClick={() => { setEditingId(a.id); setEditMessage(a.message || ''); }} className="px-3 py-1 rounded-lg border border-purple-400 text-cyan-200 hover:bg-purple-500/20 transition">Modifier</button>
													<button onClick={() => removeAnnouncement(a.id)} className="px-3 py-1 rounded-lg border border-red-400 text-red-300 hover:bg-red-500/20 transition">Supprimer</button>
												</>
											)}
										</div>
									)}
								</li>
						))}
					</ul>
				)}
			</section>
		</>
	);
}




