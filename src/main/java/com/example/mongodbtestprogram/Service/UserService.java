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

    public Boolean deleteById(UUID userId) {

        Optional<UserEntity> userOp = userRepository.findById(userId);

        if (userOp.isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
