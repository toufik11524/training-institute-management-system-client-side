// use local storage
const addToLS = (userInfo) => {
    const exists = getDb();
    let user = {};
    if (!exists) {
        user = userInfo;
    }
    else {
        user = JSON.parse(exists);
        user = userInfo;
    }
    localStorage.setItem('user', JSON.stringify(user));
}

const getDb = () => localStorage.getItem('user');
  
const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user : {};
};
  
const clearTheUser = () => {
    localStorage.removeItem('user');
}
  
export { addToLS, clearTheUser, getUser }