import { Link } from 'react-router-dom';
import { modulesCatalog } from '../data/modules';

export default function StudentsModules() {
	return (
		<main className="container-page py-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Espace Étudiant</h1>
			<div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
				{modulesCatalog.map((m) => (
					<Link key={m.id} to={`/module/${m.id}`} className="card hover:shadow-glow transition-all duration-200 w-full block">
						<div className="card-body">
							<h2 className="font-semibold text-lg">{m.title}</h2>
							<p className="text-slate-300 text-sm mt-1">Cours, TD/TP, YouTube, Drive et annonces.</p>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}



