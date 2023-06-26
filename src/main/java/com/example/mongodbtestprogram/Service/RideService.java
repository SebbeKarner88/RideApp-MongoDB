package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Functions.Functions;
import com.example.mongodbtestprogram.Repositories.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.util.List;

import static java.lang.Math.round;

@Service
public class RideService {

    private final RideRepository rideRepository;

    @Autowired
    public RideService(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }


    public List<RideEntity> getAll() {
        return rideRepository.findAll();
    }

    public RideEntity addRide(RideEntity rideEntity) {

        BigDecimal distanceRounded = new BigDecimal(
                Functions.distance(                           // DISPLAYED IN KM
                        rideEntity.getStartLoc().getLatitude(),
                        rideEntity.getEndLoc().getLatitude(),
                        rideEntity.getStartLoc().getLongitude(),
                        rideEntity.getEndLoc().getLongitude())
        ).setScale(2, RoundingMode.HALF_UP);

        Duration d = Duration.between(rideEntity.getStartTime(), rideEntity.getEndTime());

        String durationDisplay = Functions.formatDuration(d);  // RETURNS A STRING WITH TIME

        Double avgSpeed = distanceRounded.doubleValue() / (((double) d.toSeconds() / 60) / 60); // Displayed in KMT


        RideEntity ride = new RideEntity(
                rideEntity.getUser(),
                rideEntity.getBike(),
                rideEntity.getStartTime(),
                rideEntity.getEndTime(),
                rideEntity.getStartLoc(),
                rideEntity.getEndLoc(),
                distanceRounded.doubleValue(),
                durationDisplay,
                avgSpeed


        );

        rideRepository.save(ride);
        return ride;
    }

    public List<RideEntity> getAllByUser(String username) {

        List<RideEntity> rides = rideRepository.findRideEntitiesByUser_Username(username);

        if (rides.isEmpty())
            return null;

        return rides;
    }
}
