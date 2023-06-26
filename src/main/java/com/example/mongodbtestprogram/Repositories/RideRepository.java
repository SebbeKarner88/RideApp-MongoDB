package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.RideEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface RideRepository extends MongoRepository<RideEntity, String> {

    List<RideEntity> findRideEntitiesByUser_Username(String username);

}
