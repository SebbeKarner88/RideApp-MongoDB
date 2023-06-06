package com.example.mongodbtestprogram.Repositories;

import com.example.mongodbtestprogram.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<UserEntity, String> {

    UserEntity findByUserName(String userName);

}
