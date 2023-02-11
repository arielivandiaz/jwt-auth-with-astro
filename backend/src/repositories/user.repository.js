
// eslint-disable-next-line prefer-const
let usersDB = [ // I'm a DB =)
    {
        id: 0,
        username: 'ariel',
        password: '$2b$10$GABycl.e0IWdDlA4hkHnUOr5JB3AD3.F5.lYO3d3.1PnBd0wKoE8C' // ariel
    }
];

export const findUserExists = (username) => {
    return !!usersDB.find(user => user.username === username);
};

export const findOneByUsername = (username) => {
    return usersDB.find(user => user.username === username);
};

export const createNew = (user) => {
    if (user.username && user.password) {
        const id = usersDB.length;
        usersDB.push({
            ...user,
            id
        }
        );
        return usersDB[id];
    }
    return {};
};

export const getAllUsers = () => usersDB.map(user => ({ id: user.id, username: user.username }));
