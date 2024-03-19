const { initializeDatabase } = require('./db.js');
const db = initializeDatabase();

async function setCharity(charity) {
    if (charity) {
        const docRef = db.collection('charities').doc(charity.id.toString());
        await docRef.set(charity, {merge: true});
    }   
    else {
        console.log("Charity does not exist!");
    }
}
  
async function getCharity(charityId) {
    const charityDoc = await db.collection('charities').doc(charityId.toString()).get()
    return charityDoc.exists ? charityDoc.data() : null
}

async function deleteCharity(charityId) {
    await db.collection('charities').doc(charityId.toString()).delete();
}

async function setUser(user) {
    if (user) {
        const docRef = db.collection('users').doc(user.id.toString());
        await docRef.set(user, {merge: true});
    }   
    else {
        console.log("User does not exist!");
    }
}
  
async function getUser(userId) {
    const userDoc = await db.collection('users').doc(userId.toString()).get()
    return userDoc.exists ? userDoc.data() : null
}

async function deleteUser(userId) {
    await db.collection('users').doc(userId.toString()).delete();
}

async function setCharityUser(charityUser) {
    if (charityUser) {
        const docRef = db.collection('charityUsers').doc(charityUser.id.toString());
        await docRef.set(charityUser, {merge: true});
    }   
    else {
        console.log("User does not exist!");
    }
}
  
async function getCharityUser(charityUserId) {
    const userDoc = await db.collection('charityUsers').doc(charityUserId.toString()).get()
    return userDoc.exists ? userDoc.data() : null
}

async function deleteCharityUser(charityUserId) {
    await db.collection('users').doc(charityUserId.toString()).delete();
}

module.exports = {
    setCharity,
    getCharity,
    deleteCharity,
    setUser,
    getUser,
    deleteUser,
    setCharityUser,
    getCharityUser,
    deleteCharityUser
}