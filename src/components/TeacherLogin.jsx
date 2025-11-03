import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TEACHER_CODE = 'prof2025';

export default function TeacherLogin() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if already logged in
        if (localStorage.getItem('isTeacher') === 'true') {
            navigate('/enseignants');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code === TEACHER_CODE) {
            localStorage.setItem('isTeacher', 'true');
            navigate('/enseignants');
        } else {
            setError('Code invalide. Veuillez réessayer.');
        }
    };

    return (
        <div className="container-page py-8 flex items-center justify-center min-h-[60vh]">
            <div className="card w-full max-w-md">
                <div className="card-header">
                    <h2 className="text-xl font-semibold text-center">Espace Enseignant</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="teacherCode" className="block text-sm font-medium text-slate-300 mb-1">
                                Entrez le code d'accès enseignant
                            </label>
                            <input
                                type="password"
                                id="teacherCode"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full rounded-lg bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Code d'accès"
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-red-600 text-sm">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}