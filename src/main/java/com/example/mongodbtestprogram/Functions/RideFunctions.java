package com.example.mongodbtestprogram.Functions;

import com.example.mongodbtestprogram.Entities.GeoLocationEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;

import java.time.Duration;
import java.time.LocalDateTime;

public class RideFunctions {

    public static RideEntity updateRideWithCheckpoint(RideEntity currentRide, GeoLocationEntity geoLocationEntity) {

        currentRide.setEndTime(LocalDateTime.now());
        currentRide.getLocCheckpoints().add(geoLocationEntity);

        double distanceUpdate = Calculations.calcTotalDistance(currentRide).doubleValue();
        Duration d = Duration.between(currentRide.getStartTime(), currentRide.getEndTime());

        currentRide.setRideDuration(Calculations.formatDuration(d));
        currentRide.setRideLengthKM(distanceUpdate);
        currentRide.setAvgSpeedKMT((distanceUpdate / (((double) d.toSeconds() / 60) / 60)));

        return currentRide;
    }
}
