import { getUser } from './localStorage';

const isAdmin = () => {
    let admin;
    const user = getUser();
    // console.log('user.isAdmin', user.isAdmin);
    if (user.isAdmin === true) {
        admin = true;
        // console.log('auth', auth);
    } 
    else {
        admin = false;
        // console.log('auth', auth);
    }

    return admin;
};

export default isAdmin;  