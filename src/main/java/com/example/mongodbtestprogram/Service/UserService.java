package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Dto.LoginDTO;
import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public UserEntity addUser(UserEntity userEntity) {
        UserEntity newUser = new UserEntity(
                userEntity.getUserName(),
                passwordEncoder().encode(userEntity.getPassword()),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPhoneNumber(),
                userEntity.getStreet(),
                userEntity.getStreetNumber(),
                userEntity.getZipCode(),
                userEntity.getCity(),
                userEntity.getCountry(),
                userEntity.getBikeCollection()
        );
        userRepository.save(newUser);
        return userEntity;
    }
    public LoginDTO loginUser(LoginDTO loginDTO) {
        return null;
    }
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }
    public List<BikeEntity> getCollectionByUsername(String userName) {

        UserEntity user = userRepository.findByUserName(userName);
        return Arrays.stream(user.getBikeCollection()).toList();
    }
}
