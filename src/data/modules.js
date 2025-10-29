export const modulesCatalog = [
	{
		id: 'architecture-des-ordinateurs',
		title: 'Architecture des ordinateurs',
		resources: { cours: [ { label: 'Cours (PDF)', url: '#' } ], tdTp: [ { label: 'TD 1', url: '#' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive', url: '#' } ] },
	},
	{
		id: 'systemes-information',
		title: "Systèmes d'information",
		resources: { cours: [ { label: 'Cours (PDF)', url: '#' } ], tdTp: [ { label: 'TD 1', url: '#' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive', url: '#' } ] },
	},
	{
		id: 'theorie-des-graphes',
		title: 'Théorie des graphes',
		resources: { cours: [ { label: 'Cours (PDF)', url: '/pfds/THG/cour/Cours Théorie de graphes - Copie étudiants.pdf' } ], tdTp: [ { label: 'TDs', url: '/pfds/THG/td/photo_2025-10-29_16-40-00.pdf' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive', url: '#' } ] },
	},
	{
		id: 'methodes-numeriques',
		title: 'Méthodes numériques',
		resources: { cours: [ { label: 'Cours (PDF)', url: '#' } ], tdTp: [ { label: 'TD 1', url: '#' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive', url: '#' } ] },
	},
	{
		id: 'algorithmique-structures-donnees',
		title: 'Algorithmique et structures de données',
		resources: { cours: [ { label: 'Cours1', url: '#' } ,{ label: 'Cours2', url: '/pfds/algo/cour/Course02_pointers.pdf' } ,{ label: 'Cours3', url: '/pfds/algo/cour/Course03_arrays.pdf' } ], tdTp: [ { label: 'TD 1', url: '/pfds/algo/td/Tuto01_functions.pdf' } ,{ label: 'TD 2', url: '/pfds/algo/td/Tuto02_reccursiveFunctions.pdf' },{ label: 'TD 3', url: '/pfds/algo/td/TD03_pointers.pdf' },{ label: 'Tp1_2', url: '/pfds/algo/tp/TP1_2DimArr&Function.pdf' },{ label: 'Tp3', url: '/pfds/algo/tp/LabWork_02.pdf' }], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive', url: '#' } ] },
	},
	{
		id: 'logique-mathematique',
		title: 'Logique mathématique',
		resources: { cours: [ { label: 'Cours (PDF)', url: '/pfds/logic/cour/Cours-LogiqueMethematique.pdf' } ], tdTp: [ { label: 'TD 1', url: '/pfds/logic/td/TD01.pdf' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive', url: '#' } ] },
	},
];

export function getModuleById(moduleId) {
	return modulesCatalog.find((m) => m.id === moduleId);
}