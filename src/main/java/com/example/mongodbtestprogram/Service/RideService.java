package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Functions.Functions;
import com.example.mongodbtestprogram.Repositories.BikeRepository;
import com.example.mongodbtestprogram.Repositories.RideRepository;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.util.*;


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

            UserEntity user = new UserEntity(
                    userOP.get().getUserId(),
                    userOP.get().getUsername(),
                    userOP.get().getPassword(),
                    userOP.get().getRole(),
                    userOP.get().getFirstName(),
                    userOP.get().getLastName(),
                    userOP.get().getPhoneNumber(),
                    userOP.get().getStreet(),
                    userOP.get().getStreetNumber(),
                    userOP.get().getZipCode(),
                    userOP.get().getCity(),
                    userOP.get().getCountry(),
                    userOP.get().getBikeCollection(),
                    userOP.get().getUserRides()
            );
            BikeEntity bike = new BikeEntity(
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
                    bikeOP.get().getEBike()
            );

            BigDecimal distanceRounded = new BigDecimal(
                    Functions.distance(                               // DISPLAYED IN KM
                            rideEntity.getStartLoc().getLatitude(),
                            rideEntity.getEndLoc().getLatitude(),
                            rideEntity.getStartLoc().getLongitude(),
                            rideEntity.getEndLoc().getLongitude())
            ).setScale(2, RoundingMode.HALF_UP);

            Duration d = Duration.between(rideEntity.getStartTime(), rideEntity.getEndTime());
            String durationDisplay = Functions.formatDuration(d);    // RETURNS A STRING WITH TIME

            Double avgSpeed = distanceRounded.doubleValue() / (((double) d.toSeconds() / 60) / 60); // Displayed in KMT

            RideEntity ride = new RideEntity(
                    UUID.randomUUID(),
                    user,
                    bike,
                    rideEntity.getStartTime(),
                    rideEntity.getEndTime(),
                    rideEntity.getStartLoc(),
                    rideEntity.getEndLoc(),
                    distanceRounded.doubleValue(),
                    durationDisplay,
                    avgSpeed
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
