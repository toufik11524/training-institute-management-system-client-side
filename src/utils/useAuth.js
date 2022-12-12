import { getUser } from './localStorage';

const useAuth = () => {
    let auth;
    const user = getUser();
    // console.log('user.isAdmin', user.isAdmin);
    if (user.email) {
        auth = true;
        // console.log('auth', auth);
    } 
    else {
        auth = false;
        // console.log('auth', auth);
    }

    return auth;
};

export default useAuth;    