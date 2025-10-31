import { useAnnouncements } from '../context/AnnouncementsContext';

export default function ModuleAnnouncementsPreview({ moduleId }) {
  const { latestByModule, loading } = useAnnouncements();
  if (loading) return <div className="text-slate-500 text-sm">Chargement…</div>;

  const latest = latestByModule[moduleId] || null;
  if (!latest) return <div className="text-slate-500 text-sm">Aucune annonce</div>;

  return (
    <div className="mt-3 text-left">
      <div className="text-xs text-slate-300">Dernière annonce</div>
      <div className="mt-1 p-3 rounded-lg bg-white/5 border border-white/6 backdrop-blur-sm text-slate-200 text-sm">
        <div className="font-medium">{latest.teacherName || 'Enseignant'}</div>
        <div className="mt-1 truncate">{latest.message}</div>
        <div className="text-xs text-slate-400 mt-2">{latest.createdAt?.toDate ? latest.createdAt.toDate().toLocaleString() : ''}</div>
      </div>
    </div>
  );
}
