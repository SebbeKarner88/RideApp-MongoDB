package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Functions.Functions;
import com.example.mongodbtestprogram.Mappers.OptionalToEntity;
import com.example.mongodbtestprogram.Repositories.BikeRepository;
import com.example.mongodbtestprogram.Repositories.RideRepository;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;

    @Autowired
    public RideService(RideRepository rideRepository, UserRepository userRepository, BikeRepository bikeRepository) {
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
        this.bikeRepository = bikeRepository;
    }

    public List<RideEntity> getAll() {
        return rideRepository.findAll();
    }

    public RideEntity addRide(UUID userId, UUID bikeId, RideEntity rideEntity) {

        Optional<UserEntity> userOP = userRepository.findById(userId);
        Optional<BikeEntity> bikeOP = bikeRepository.findById(bikeId);

        if (userOP.isPresent() && bikeOP.isPresent()) {

            UserEntity user = OptionalToEntity.MapUser(userOP);
            BikeEntity bike = OptionalToEntity.MapBike(bikeOP);

            /* DISPLAYED IN KM
            BigDecimal distanceRounded = new BigDecimal(
                    Functions.distance(
                            rideEntity.getStartLoc(),
                            rideEntity.getEndLoc())
            ).setScale(2, RoundingMode.HALF_UP);
            */
            BigDecimal distance = Functions.calcTotalDistance(rideEntity);

            // RETURNS A STRING WITH TIME
            Duration d = Duration.between(rideEntity.getStartTime(), rideEntity.getEndTime());

            RideEntity ride = new RideEntity(
                    UUID.randomUUID(),
                    user,
                    bike,
                    rideEntity.getStartTime(),
                    rideEntity.getEndTime(),
                    rideEntity.getLocCheckpoints(),
                    distance.doubleValue(),
                    Functions.formatDuration(d), // Formatting to a time String.
                    distance.doubleValue() / (((double) d.toSeconds() / 60) / 60) // Displaying Km/T
            );

            rideRepository.save(ride);

            // SAVE THE RIDE TO THE SPECIFIED USERENTITY
            UserEntity user1 = userRepository.findById(userId).get();
            List<RideEntity> list = user1.getUserRides();
            list.add(ride);
            user1.setUserRides(list);
            userRepository.saveAll(List.of(user1));

            return ride;
        }
        return null;
    }

    public List<RideEntity> getAllByUser(String username) {
        List<RideEntity> rides = rideRepository.findRideEntitiesByUser_Username(username);

        if (rides.isEmpty())
            return null;
        return rides;
    }

    public Boolean deleteById(UUID rideId) {
        Optional<RideEntity> rideOp = rideRepository.findById(rideId);

        if (rideOp.isPresent()) {
            rideRepository.deleteById(rideId);

            UserEntity user1 = userRepository.findById(rideOp.get().getUser().getUserId()).get();
            List<RideEntity> list = user1.getUserRides();

            List<RideEntity> filteredList = list
                    .stream()
                    .filter(x -> !x.getRideId().equals(rideId))
                    .toList();

            user1.setUserRides(filteredList);
            userRepository.saveAll(List.of(user1));

            return true;
        }
        return false;
    }
}
