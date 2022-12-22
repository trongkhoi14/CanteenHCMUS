import { useReducer } from 'react';
import { AuthContext } from './../context';
import { authReducer, authInitialState } from './../reducer';

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, authInitialState);
    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;