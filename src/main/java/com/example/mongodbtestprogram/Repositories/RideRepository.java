package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.RideEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface RideRepository extends MongoRepository<RideEntity, UUID> {

    Optional<RideEntity> findByRideId(UUID rideId);
    List<RideEntity> findRideEntitiesByUser_Username(String username);

}
