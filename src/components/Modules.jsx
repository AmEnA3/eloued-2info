import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { modulesCatalog } from '../data/modulesCatalog';

export default function Modules() {
	return (
		<main className="container-page center-section">
			<m.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="mb-8"
			>
				<h1 className="text-3xl font-bold mb-2">Modules — 2ème année Informatique</h1>
				<p className="text-slate-300">Sélectionnez un module pour voir les détails et les annonces.</p>
			</m.div>
			<div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{modulesCatalog.map((mItem, idx) => (
					<m.div
						key={mItem.slug}
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.35 + idx * 0.03, ease: 'easeOut' }}
						className="card hover:shadow-glowLg transition max-w-md mx-auto w-full"
					>
						<div className="card-body text-left">
							<h2 className="text-lg font-semibold">{mItem.title}</h2>
							<div className="mt-3">
								<h3 className="font-medium flex items-center gap-2"><span>ℹ️</span><span>Informations</span></h3>
								<p className="text-slate-300 text-sm mt-2">{mItem.info || mItem.description}</p>
							</div>
							<div className="mt-4">
								<Link to={`/modules/${mItem.slug}`} className="btn-outline">Voir les détails</Link>
							</div>
						</div>
					</m.div>
				))}
			</div>
		</main>
	);
}
