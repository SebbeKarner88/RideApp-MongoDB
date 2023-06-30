package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;


public interface UserRepository extends MongoRepository<UserEntity, UUID> {

    Optional<UserEntity> findByUserId(UUID userId);
    Optional<UserEntity> findByUsername(String username);
    Boolean existsByUsername(String userName);
    UserEntity getUserEntityByUserId(UUID userId);
}
