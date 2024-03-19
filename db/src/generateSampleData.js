const firstNames = require('./sampleData/firstNames.json');
const lastNames = require ('./sampleData/lastNames.json');
const charityCategories = ["Education", "Disabilities", "Cancer Support", "Disaster Relief", "Human Rights"];
const cities = ["Cairo", "Giza", "Alexandria", "Aswan", "Luxor"];

async function generateUser() {

    const firstName = firstNames[Math.floor(Math.random() * 3800)];
    const lastName = lastNames[Math.floor(Math.random() * 3800)];
    const usernameNumber = Math.floor(Math.random() * 100);

    return {
        "id": Math.floor(Math.random() * 100), // 1-100 (will overwrite any existing doc with that id but thats ok for sample data)
        "name": `${firstName} ${lastName}`,
        "username": `${firstName}${lastName}`+ usernameNumber,
        "password": pwGenerator(), // remember to actually hash() this in the real project
        "email": `${firstName}${lastName}`+ usernameNumber + "@gmail.com",
        "phoneNumber": (Math.floor(Math.random() * 88888888) + 11111111).toString(),
        "subscriptions": generateIds(),
        "bookmarks": generateIds(),
        "avatarURL": "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg"
    }
}
function generateCharity() {

    const lastName = lastNames[Math.floor(Math.random() * 3800)];
    const category = charityCategories[Math.floor(Math.random() * 5)];
    const city = cities[Math.floor(Math.random() * 5)];
   
    return {
        "id": Math.floor(Math.random() * 100), // 1-100 (will overwrite any existing doc with that id but thats ok for sample data)
        "name": `The ${lastName} Foundation`, // lol
        "charityId": Math.floor(Math.random() * 888888) + 111111,
        "charityCenter": city,
        "url": `the${lastName}foundation.com`,
        "subscribers": generateIds(),
        "reviews": `The${lastName}Foundation@gmail.com`,
        "rating": (Math.random() * 5).toFixed(1), // 1 to 5
        "coverURL": "https://wallpaperaccess.com/full/2358939.jpg",
        "category": category,
        "bio": `Welcome to The ${lastName} Foundation! This charity is focused on ${category}. Please visit our website to make a change!`
    }
}

function generateIds() {
    let ids = [];
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        ids[i] = Math.floor(Math.random() * 100); // generate 1-10 random ids
    }
    return ids;
}

function pwGenerator() {
    let pw = [];
    for (let i = 0; i < 15; i++) {
        pw.push(s = String.fromCharCode(Math.floor(Math.random() * 89) + 33));
    }
    
    return pw.join('');
}

module.exports = {
    generateUser,
    generateCharity,
}