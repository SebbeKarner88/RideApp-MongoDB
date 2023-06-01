package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Dto.UserDTO;
import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public UserDTO addUser(UserDTO userDTO) {
        UserEntity newUser = new UserEntity(
                userDTO.userName(),
                passwordEncoder().encode(userDTO.password()),
                userDTO.firstName(),
                userDTO.lastName(),
                userDTO.phoneNumber(),
                userDTO.street(),
                userDTO.streetNumber(),
                userDTO.zipCode(),
                userDTO.city(),
                userDTO.country()
        );
        userRepository.save(newUser);
        return userDTO;
    }

    public List<UserDTO> getAll() {
        return userRepository.findAll()
                .stream()
                .map(UserService::userDTO)
                .collect(Collectors.toList());
    }

    private static UserDTO userDTO (UserEntity userEntity) {
        return new UserDTO(
                userEntity.getUserName(),
                userEntity.getPassword(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPhoneNumber(),
                userEntity.getStreet(),
                userEntity.getStreetNumber(),
                userEntity.getZipCode(),
                userEntity.getCity(),
                userEntity.getCountry());
    }

}
