import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useRole } from '../context/RoleContext';
import { modulesCatalog } from '../data/modules';

export default function NewAnnouncementForm() {
  const { role } = useRole();
  const [moduleId, setModuleId] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Only render the form UI for teachers. Hooks must be called unconditionally above.
  if (role !== 'enseignant') return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!message.trim()) {
      setError('Le message est obligatoire.');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        moduleId: moduleId || (modulesCatalog.find(m => m.title === moduleTitle)?.id || ''),
        moduleTitle: moduleTitle.trim() || 'Général',
        teacherName: teacherName.trim() || 'Enseignant',
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setMessage('');
      setSuccess('Annonce publiée.');
      // keep fields visible and persistent; any live listeners will update
    } catch (err) {
      console.error(err);
      setError("Échec de publication. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-header">
        <h3 className="font-semibold">Publier une annonce (publique)</h3>
      </div>
      <div className="card-body space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Module</label>
          <select value={moduleId} onChange={(e) => { const id = e.target.value; setModuleId(id); const m = modulesCatalog.find(x => x.id === id); setModuleTitle(m ? m.title : ''); }} className="custom-select w-full rounded-lg border-slate-300 px-3 py-2 bg-transparent">
            <option value="">Sélectionner un module (ou saisir un titre)</option>
            {modulesCatalog.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
          <div className="mt-2">
            <input value={moduleTitle} onChange={(e) => { setModuleTitle(e.target.value); setModuleId(''); }} placeholder="Ou saisissez un titre" className="w-full rounded-lg border-slate-300 px-3 py-2 bg-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nom de l'enseignant</label>
          <input value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className="w-full rounded-lg border-slate-300 px-3 py-2 bg-transparent" placeholder="Ex: D. Amenna" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full rounded-lg border-slate-300 px-3 py-2 bg-transparent" />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">{submitting ? 'Publication…' : 'Publier'}</button>
          {error && <span className="text-sm text-red-600">{error}</span>}
          {success && <span className="text-sm text-green-600">{success}</span>}
        </div>
      </div>
    </form>
  );
}
