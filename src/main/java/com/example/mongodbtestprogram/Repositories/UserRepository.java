package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserRepository extends MongoRepository<UserEntity, String> {

    Optional<UserEntity> findByUsername(String username);
    Boolean existsByUsername(String username);

}
