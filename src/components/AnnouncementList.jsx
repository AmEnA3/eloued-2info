import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useRole } from '../context/RoleContext';

export default function AnnouncementList({ moduleId }) {
	const [announcements, setAnnouncements] = useState([]);
	const [loading, setLoading] = useState(true);
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

	// This list is read-only for students. Editing is handled in AnnouncementForm (teacher-only).

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
							<p className="text-slate-200 mt-1">{a.message}</p>
						</div>
						<div className="text-xs text-slate-400 whitespace-nowrap text-right">
							{a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : ''}
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
