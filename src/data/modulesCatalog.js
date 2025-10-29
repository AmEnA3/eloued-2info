export const modulesCatalog = [
	{
		slug: 'architecture',
		title: 'Architecture des ordinateurs',
		description: 'Étude de l’architecture matérielle et des principes fondamentaux des ordinateurs.',
		info: 'Ce module explique la structure interne de l’ordinateur, le fonctionnement des processeurs, de la mémoire et des bus. Il permet de comprendre comment le matériel exécute les instructions logicielles.'
	},
	{
		slug: 'systemes-information',
		title: "Systèmes d'information",
		description: 'Concepts, modélisation et mise en œuvre des systèmes d’information modernes.',
		info: "Il s'agit de l'étude des systèmes qui collectent, stockent et traitent les informations dans une organisation. On apprend à modéliser et gérer les données efficacement."
	},
	{
		slug: 'theorie-des-graphes',
		title: 'Théorie des graphes',
		description: 'Notions de graphes, algorithmes et applications en informatique.',
		info: 'Ce module introduit les graphes et leurs applications en informatique : réseaux, chemins, arbres et algorithmes de parcours.'
	},
	{
		slug: 'methodes-numeriques',
		title: 'Méthodes numériques',
		description: 'Techniques numériques pour la résolution de problèmes mathématiques.',
		info: 'Il traite des techniques mathématiques pour résoudre des problèmes numériques : approximation, interpolation, et équations différentielles.'
	},
	{
		slug: 'algorithmique-structures-donnees',
		title: 'Algorithmique et structures de données',
		description: 'Conception d’algorithmes efficaces et structures de données fondamentales.',
		info: 'Ce cours approfondit la conception et l’analyse des algorithmes ainsi que les structures de données (listes, piles, files, arbres).'
	},
	{
		slug: 'logique-mathematique',
		title: 'Logique mathématique',
		description: 'Fondements logiques pour le raisonnement formel et l’informatique théorique.',
		info: 'Ce module développe la pensée logique et formelle. On y apprend les propositions, les tables de vérité, les implications et la démonstration.'
	},
];

export function findModuleBySlug(slug) {
	return modulesCatalog.find((m) => m.slug === slug);
}
