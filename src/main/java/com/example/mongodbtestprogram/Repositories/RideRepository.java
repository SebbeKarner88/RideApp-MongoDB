package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.RideEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;


public interface RideRepository extends MongoRepository<RideEntity, UUID> {

    List<RideEntity> findRideEntitiesByUser_Username(String username);
    List<RideEntity> findRideEntitiesByUser_UserId(String userId);

}
