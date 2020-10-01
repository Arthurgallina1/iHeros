const getDistanceFromLatLonInKm = require("../utils/distanceCalculator");

const findClosestHero = async (heroes, location) => {
    const { lat, lng } = location;
    const formattedHeroesWithDistance = await Promise.all(
        heroes.map(async (hero) => {
            let distanceInKm = getDistanceFromLatLonInKm(
                { latitude: lat, longitude: lng },
                {
                    latitude: hero.location.coordinates[1],
                    longitude: hero.location.coordinates[0],
                }
            );
            let heroWithDistance = { hero, distanceInKm };
            return heroWithDistance;
        })
    );
    return formattedHeroesWithDistance[0].hero;
};

module.exports = { findClosestHero };
