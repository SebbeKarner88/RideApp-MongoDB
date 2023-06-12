package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Dto.LoginDTO;
import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
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

    public Boolean addUser(UserEntity userEntity) {

        if (userRepository.existsByUserName(userEntity.getUserName()))
            return false;

        userEntity.setPassword(passwordEncoder().encode(userEntity.getPassword()));
        userRepository.save(userEntity);
        return true;
    }
    public Boolean loginUser(LoginDTO loginDTO) {

        if (userRepository.existsByUserName(loginDTO.username())) {
            UserEntity user = userRepository.findByUserName(loginDTO.username());

            return BCrypt.checkpw(loginDTO.password(), user.getPassword());
        }
        return false;
    }

    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }
    public List<BikeEntity> getCollectionByUsername(String userName) {

        UserEntity user = userRepository.findByUserName(userName);
        return Arrays.stream(user.getBikeCollection()).toList();
    }
}
