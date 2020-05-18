class Plant {
  constructor(
    plantId,
    userId,
    plantName,
    imageUrl,
    latitude,
    longitude,
    plantInfoUrl,
    dateTimeFound,
    commonName,
    probability,
    points
  ) {
    this.plantId = plantId;
    this.userId = userId;
    this.plantName = plantName;
    this.imageUrl = imageUrl;
    this.latitude = latitude;
    this.longitude = longitude;
    this.plantInfoUrl = plantInfoUrl;
    this.dateTimeFound = dateTimeFound;
    this.commonName = commonName;
    this.probability = probability;
    this.points = points;
  }
}

export default Plant;
