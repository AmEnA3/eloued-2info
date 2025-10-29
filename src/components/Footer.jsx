import { FaEnvelope, FaGithub } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className="container-page py-6">
			<div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-glow px-4 py-4">
				<div className="flex flex-col items-center gap-3">
					<h2 className="text-slate-200 text-sm">Contact</h2>
					<div className="flex items-center gap-4">
						<a href="mailto:aminahamdi886@gmail.com" className="inline-flex items-center gap-2 text-cyan-200 hover:text-white transition">
							<FaEnvelope className="text-cyan-300" />
							<span>aminahamdi886@gmail.com</span>
						</a>
						<a href="https://github.com/AmEnA3" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-200 hover:text-white transition">
							<FaGithub className="text-cyan-300" />
							<span>github.com/AmEnA3</span>
						</a>
					</div>
					<p className="text-slate-400 text-xs">© {new Date().getFullYear()} Université d’El Oued – 2ème année Informatique</p>
				</div>
			</div>
		</footer>
	);
}


