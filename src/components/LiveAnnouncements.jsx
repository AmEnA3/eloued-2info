import { useAnnouncements } from '../context/AnnouncementsContext';

export default function LiveAnnouncements() {
  const { groupedAnnouncements, loading, error } = useAnnouncements();

  if (loading) return <div className="text-slate-500">Chargement des annonces…</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const moduleKeys = Object.keys(groupedAnnouncements);
  if (moduleKeys.length === 0) return <div className="text-slate-500">Aucune annonce pour le moment.</div>;

  return (
    <div className="space-y-6">
      {moduleKeys.map((moduleId) => {
        const section = groupedAnnouncements[moduleId];
        return (
          <section key={moduleId} className="card">
            <div className="card-header">
              <h3 className="font-semibold">{section.moduleTitle}</h3>
            </div>
            <div className="card-body">
              {section.announcements.map((a) => (
                <div key={a.id} className="p-3 rounded-lg bg-white/5 border border-white/10 mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{a.teacherName || 'Enseignant'}</div>
                      <div className="text-slate-200 mt-1">{a.message}</div>
                    </div>
                    <div className="text-xs text-slate-400 whitespace-nowrap ml-4 text-right">
                      {a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
