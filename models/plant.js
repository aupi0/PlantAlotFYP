class Plant {
    constructor(id, imageUrl, infoUrl, name, confidence, confirmed, longitude, latitude) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.infoUrl = infoUrl;
        this.name = name;
        this.confidence = confidence;
        this.confirmed = confirmed;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}

export default Plant;