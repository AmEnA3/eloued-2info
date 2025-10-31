import LiveAnnouncements from './LiveAnnouncements';
import NewAnnouncementForm from './NewAnnouncementForm';

export default function AnnouncementsPage() {
  return (
    <main className="container-page py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Annonces</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveAnnouncements />
        </div>
        <aside className="lg:col-span-1">
          <NewAnnouncementForm />
        </aside>
      </div>
    </main>
  );
}
