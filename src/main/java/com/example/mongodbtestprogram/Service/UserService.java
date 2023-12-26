package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    public UserEntity getByUsername(String username) {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        return user.map(userEntity -> new UserEntity(
                userEntity.getUserId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.getRole(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPhoneNumber(),
                userEntity.getStreet(),
                userEntity.getStreetNumber(),
                userEntity.getZipCode(),
                userEntity.getCity(),
                userEntity.getCountry(),
                userEntity.getBikeCollection(),
                userEntity.getUserRides()
        )).orElse(null);
    }

    public Boolean deleteById(UUID userId) {

        Optional<UserEntity> userOp = userRepository.findById(userId);

        if (userOp.isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
