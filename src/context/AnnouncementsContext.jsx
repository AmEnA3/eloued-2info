import { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const AnnouncementsContext = createContext(null);

export function AnnouncementsProvider({ children }) {
  const [announcementsList, setAnnouncementsList] = useState([]);
  const [groupedAnnouncements, setGroupedAnnouncements] = useState({});
  const [latestByModule, setLatestByModule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        try {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setAnnouncementsList(items);

          // Group by moduleId/moduleTitle
          const grouped = items.reduce((acc, a) => {
            const key = a.moduleId || a.moduleTitle || 'general';
            if (!acc[key]) acc[key] = { moduleTitle: a.moduleTitle || key, announcements: [] };
            acc[key].announcements.push(a);
            return acc;
          }, {});
          setGroupedAnnouncements(grouped);

          // latest per module (items are ordered by createdAt desc)
          const latest = {};
          for (const [key, section] of Object.entries(grouped)) {
            latest[key] = section.announcements[0] || null;
          }
          setLatestByModule(latest);

          setLoading(false);
        } catch (err) {
          console.error('Announcements onSnapshot processing error', err);
          setError('Erreur lors du traitement des annonces.');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Announcements onSnapshot error', err);
        setError('Erreur lors de la récupération des annonces.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const getAnnouncementsForModule = (moduleId) => {
    if (!moduleId) return [];
    return groupedAnnouncements[moduleId]?.announcements || [];
  };

  return (
    <AnnouncementsContext.Provider value={{ announcementsList, groupedAnnouncements, latestByModule, getAnnouncementsForModule, loading, error }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}

export function useAnnouncements() {
  const ctx = useContext(AnnouncementsContext);
  if (!ctx) throw new Error('useAnnouncements must be used within AnnouncementsProvider');
  return ctx;
}

export default AnnouncementsContext;
