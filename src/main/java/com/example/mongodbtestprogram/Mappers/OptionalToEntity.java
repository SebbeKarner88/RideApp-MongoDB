package com.example.mongodbtestprogram.Mappers;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;

import java.util.Optional;

public class OptionalToEntity {

    public static UserEntity MapUser(Optional<UserEntity> userOP) {
        return userOP.map(userEntity -> new UserEntity(
                userEntity.getUserId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.getRole(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPhoneNumber(),
                userEntity.getStreet(),
                userEntity.getStreetNumber(),
                userEntity.getZipCode(),
                userEntity.getCity(),
                userEntity.getCountry(),
                userEntity.getBikeCollection(),
                userEntity.getUserRides())).orElse(null);
    }

    public static BikeEntity MapBike(Optional<BikeEntity> bikeOP) {
        return bikeOP.map(BikeEntity -> new BikeEntity(
                bikeOP.get().getBikeId(),
                bikeOP.get().getMaker(),
                bikeOP.get().getModel(),
                bikeOP.get().getSize(),
                bikeOP.get().getPictures(),
                bikeOP.get().getYear(),
                bikeOP.get().getType(),
                bikeOP.get().getColors(),
                bikeOP.get().getMaterial(),
                bikeOP.get().getWheelSize(),
                bikeOP.get().getGears(),
                bikeOP.get().getEBike())).orElse(null);
    }

    public static RideEntity MapRide(Optional<RideEntity> rideOP) {
        return rideOP.map(RideEntity -> new RideEntity(
                rideOP.get().getRideId(),
                rideOP.get().getUser(),
                rideOP.get().getBike(),
                rideOP.get().getStartTime(),
                rideOP.get().getEndTime(),
                rideOP.get().getLocCheckpoints(),
                rideOP.get().getRideLengthKM(),
                rideOP.get().getRideDuration(),
                rideOP.get().getAvgSpeedKMT())).orElse(null);
    }
}
