const { setCharity, getCharity, setUser, getUser, deleteCharity, deleteUser } = require('./src/api');
const { generateCharity, generateUser } = require('./src/generateSampleData');

for (let i = 0; i < 100; i++) {
    const charity = generateCharity();
    setCharity(charity)
        .catch(err => console.log(err));
}
for (let i = 0; i < 100; i++) {
    generateUser()
        .then((user) => setUser(user))
        .catch(err => console.log(err));
}

// API Testing Functions

// setCharity
const charity = generateCharity();
setCharity(charity)
    .catch(err => console.log(err));

// getCharity
getCharity(1)
    .then((charity) => console.log(`${charity.id}: ${charity.name}`))
    .catch(err => console.log(err));

// deleteCharity
deleteCharity(1)
    .then(console.log("Charity deleted!"))
    .catch(err => console.log(err));

// setUser
generateUser()
    .then((user) => setUser(user))
    .catch(err => console.log(err));

// getUser
getUser(1)
    .then((user) => console.log(`${user.id}: ${user.name}`))
    .catch(err => console.log(err));

// deleteUser
deleteUser(1)
    .then(console.log("User deleted!"))
    .catch(err => console.log(err));