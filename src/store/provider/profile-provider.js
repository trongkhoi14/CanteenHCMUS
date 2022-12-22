import { useReducer } from 'react';
import { ProfileContext } from '../context';
import { profileReducer, profileInitialState } from '../reducer';

function ProfileProvider({ children }) {
    const [state, dispatch] = useReducer(profileReducer, profileInitialState);
    return (
        <ProfileContext.Provider value={[state, dispatch]}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;