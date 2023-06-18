package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Dto.LoginDTO;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean loginUser(LoginDTO loginDTO) {

        if (userRepository.existsByUsername(loginDTO.username())) {
            Optional<UserEntity> user = userRepository.findByUsername(loginDTO.username());

            return BCrypt.checkpw(loginDTO.password(), user.get().getPassword());
        }
        return false;
    }
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

}
