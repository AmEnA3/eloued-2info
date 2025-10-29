import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RoleContext = createContext({ role: 'etudiant', setRole: () => {} });

export function RoleProvider({ children }) {
	const [role, setRoleState] = useState('etudiant');

	useEffect(() => {
		const saved = localStorage.getItem('app_role');
		if (saved === 'etudiant' || saved === 'enseignant') {
			setRoleState(saved);
		}
	}, []);

	const setRole = (newRole) => {
		setRoleState(newRole);
		localStorage.setItem('app_role', newRole);
	};

	const value = useMemo(() => ({ role, setRole }), [role]);

	return (
		<RoleContext.Provider value={value}>{children}</RoleContext.Provider>
	);
}

export function useRole() {
	return useContext(RoleContext);
}


