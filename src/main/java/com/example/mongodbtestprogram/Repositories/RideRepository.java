package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RideRepository extends MongoRepository<RideEntity, String> {

}
