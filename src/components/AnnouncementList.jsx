import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRole } from '../context/RoleContext';

export default function AnnouncementList({ moduleId }) {
	const [announcements, setAnnouncements] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editingId, setEditingId] = useState(null);
	const [editMessage, setEditMessage] = useState('');
	const { role } = useRole();

	useEffect(() => {
		if (!moduleId) return;
		const q = query(
			collection(db, 'announcements'),
			where('moduleId', '==', moduleId),
			orderBy('createdAt', 'desc')
		);
		const unsub = onSnapshot(q, (snapshot) => {
			const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setAnnouncements(items);
			setLoading(false);
		});
		return () => unsub();
	}, [moduleId]);

	async function saveEdit(id) {
		const ref = doc(db, 'announcements', id);
		await updateDoc(ref, { message: editMessage });
		setEditingId(null);
		setEditMessage('');
	}

	async function remove(id) {
		const ref = doc(db, 'announcements', id);
		await deleteDoc(ref);
	}

	if (loading) {
		return <div className="text-slate-500">Chargement des annonces…</div>;
	}

	if (announcements.length === 0) {
		return <div className="text-slate-500">Aucune annonce pour le moment.</div>;
	}

	return (
		<ul className="space-y-3">
			{announcements.map((a) => (
				<li key={a.id} className="p-4 rounded-lg bg-white/10 border border-white/10 backdrop-blur">
					<div className="flex items-start justify-between gap-4">
						<div className="text-left">
							<p className="font-medium">{a.teacherName || 'Enseignant'}</p>
							{editingId === a.id ? (
								<div className="mt-2 space-y-2">
									<textarea className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} rows={3} />
									<div className="flex gap-2">
									<button onClick={() => saveEdit(a.id)} className="px-3 py-1 rounded-lg border border-purple-400 text-cyan-200 hover:bg-purple-500/20 transition">Enregistrer</button>
										<button onClick={() => { setEditingId(null); setEditMessage(''); }} className="px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10 transition">Annuler</button>
									</div>
								</div>
							) : (
								<p className="text-slate-200 mt-1">{a.message}</p>
							)}
						</div>
						<div className="text-xs text-slate-400 whitespace-nowrap text-right">
							{a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : ''}
							{role === 'enseignant' && editingId !== a.id && (
								<div className="mt-2 flex gap-2 justify-end">
									<button onClick={() => { setEditingId(a.id); setEditMessage(a.message || ''); }} className="px-2 py-1 rounded border border-purple-400 text-cyan-200 hover:bg-purple-500/20 transition text-xs">Modifier</button>
									<button onClick={() => remove(a.id)} className="px-2 py-1 rounded border border-red-400 text-red-300 hover:bg-red-500/20 transition text-xs">Supprimer</button>
								</div>
							)}
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
