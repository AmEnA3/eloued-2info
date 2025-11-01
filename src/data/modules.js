export const modulesCatalog = [
	{
		id: 'architecture-des-ordinateurs',
		title: 'Architecture des ordinateurs',
		resources: { cours: [ { label: 'Cours (PDF)', url: '#' } ], tdTp: [ { label: 'TD 1', url: '#' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive (EXAMS ET INTTERO)', url: 'https://drive.google.com/drive/folders/1hXw67w447FnrPRG7MG57vqQ8ok5HafEx?usp=drive_link' } ] },
	},
	{
		id: 'systemes-information',
		title: "Systèmes d'information",
		resources: { cours: [ { label: 'Cours (PDF)', url: '#' } ], tdTp: [ { label: 'TD 1', url: '#' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive (EXAMS ET INTTERO)', url: 'https://drive.google.com/drive/folders/1WGG6ZmkJhSKucE4hQYpKYHrpbdHtKdCC?usp=drive_link' } ] },
	},
	{
		id: 'theorie-des-graphes',
		title: 'Théorie des graphes',
		resources: { cours: [ { label: 'Cours (PDF)', url: '/pfds/THG/cour/Cours Théorie de graphes - Copie étudiants.pdf' } ], tdTp: [ { label: 'TDs', url: '/pfds/THG/td/photo_2025-10-29_16-40-00.pdf' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive (EXAMS ET INTTERO)', url: 'https://drive.google.com/drive/folders/1bSq6sXKJs4q2pH0k9vYl8DVdUSXwhBNs?usp=drive_link' } ] },
	},
	{
		id: 'methodes-numeriques',
		title: 'Méthodes numériques',
		resources: { cours: [ { label: 'Cours (PDF)', url: '#' } ], tdTp: [ { label: 'TD 1', url: '#' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive (EXAMS ET INTTERO)', url: 'https://drive.google.com/drive/folders/1pEwr_KRrel6PpmgQKkcPfip5G2QlrUEa?usp=drive_link' } ] },
	},
	{
		id: 'algorithmique-structures-donnees',
		title: 'Algorithmique et structures de données',
		resources: { cours: [ { label: 'Cours1', url: '#' } ,{ label: 'Cours2', url: '/pfds/algo/cour/Course02_pointers.pdf' } ,{ label: 'Cours3', url: '/pfds/algo/cour/Course03_arrays.pdf' } ], tdTp: [ { label: 'TD 1', url: '/pfds/algo/td/Tuto01_functions.pdf' } ,{ label: 'TD 2', url: '/pfds/algo/td/Tuto02_reccursiveFunctions.pdf' },{ label: 'TD 3', url: '/pfds/algo/td/TD03_pointers.pdf' },{ label: 'Tp1_2', url: '/pfds/algo/tp/TP1_2DimArr&Function.pdf' },{ label: 'Tp3', url: '/pfds/algo/tp/LabWork_02.pdf' }], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive (EXAMS ET INTTERO)', url: 'https://drive.google.com/drive/folders/1_VWQj4PQoVVH1RM5d_2UAKQTx-KZNMvK?usp=drive_link' } ] },
	},
	{
		id: 'logique-mathematique',
		title: 'Logique mathématique',
		resources: { cours: [ { label: 'Cours (PDF)', url: '/pfds/logic/cour/Cours-LogiqueMethematique.pdf' } ], tdTp: [ { label: 'TD 1', url: '/pfds/logic/td/TD01.pdf' } ], youtube: [ { label: 'Playlist YouTube', url: '#' } ], drive: [ { label: 'Google Drive (EXAMS ET INTTERO)', url: 'https://drive.google.com/drive/folders/1ySIPV0rZzhkFvkuSyezhh7HPlOcbjQVF?usp=drive_link' } ] },
	},
];

export function getModuleById(moduleId) {
	return modulesCatalog.find((m) => m.id === moduleId);
}