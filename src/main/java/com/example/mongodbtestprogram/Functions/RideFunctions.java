package com.example.mongodbtestprogram.Functions;

import com.example.mongodbtestprogram.Entities.GeoLocationEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

public class RideFunctions {

    public static RideEntity updateRideWithCheckpoint(RideEntity currentRide, List<GeoLocationEntity> geoLocationEntity) {

        currentRide.setEndTime(LocalDateTime.now());
        currentRide.setLocCheckpoints(geoLocationEntity);

        double distanceUpdate = Calculations.calcTotalDistance(currentRide).doubleValue();
        Duration d = Duration.between(currentRide.getStartTime(), currentRide.getEndTime());

        currentRide.setRideDuration(Calculations.formatDuration(d));
        currentRide.setRideLengthKM(distanceUpdate);
        currentRide.setAvgSpeedKMT((distanceUpdate / (((double) d.toSeconds() / 60) / 60)));

        return currentRide;
    }
}
