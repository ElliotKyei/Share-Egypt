class Charity{
  constructor(id, name, charityId, charityCenter, url, subscribers=[], reviews='', rating, coverURL='', category, bio=''){
    this.id = id;
    this.name = name;
    this.charityId = charityId;
    this.charityCenter = charityCenter;
    this.url = url;
    this.subscribers = subscribers;
    this.reviews = reviews;
    this.rating = rating;
    this.coverURL = coverURL;
    this.category = category;
    this.bio = bio;
  }
}

module.exports = Charity;