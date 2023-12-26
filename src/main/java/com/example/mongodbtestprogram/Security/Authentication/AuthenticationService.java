package com.example.mongodbtestprogram.Security.Authentication;

import com.example.mongodbtestprogram.Entities.UserEntity;
import com.example.mongodbtestprogram.Enum.Role;
import com.example.mongodbtestprogram.Repositories.UserRepository;
import com.example.mongodbtestprogram.Security.Register.Jwt.JwtService;
import com.example.mongodbtestprogram.Security.Register.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        Optional<UserEntity> test = userRepository.findByUsername(request.getUsername());

        if (test.isPresent()) {
            return AuthenticationResponse
                    .builder()
                    .token("Error: 1") // Username not available!
                    .build();
        }

        var user = UserEntity
                .builder()
                .userId(UUID.randomUUID())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .street(request.getStreet())
                .streetNumber(request.getStreetNumber())
                .zipCode(request.getZipCode())
                .city(request.getCity())
                .country(request.getCountry())
                .bikeCollection(List.of(request.getBikeCollection()))
                .userRides(List.of(request.getUserRides()))
                .build();

        var jwtToken = jwtService.generateToken(user);

        userRepository.save(user);

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        Optional<UserEntity> user = userRepository.findByUsername(request.getUsername());

        if (user.isPresent()) {

            if (BCrypt.checkpw(request.getPassword(), user.get().getPassword())) {

                var jwtToken = jwtService.generateToken(user.get());

                return AuthenticationResponse
                        .builder()
                        .token(jwtToken)
                        .userId(String.valueOf(user.get().getUserId()))
                        .build();
            }

            return AuthenticationResponse
                    .builder()
                    .token("Error 2") // Wrong password.
                    .build();
        }

        return AuthenticationResponse
                .builder()
                .token("Error 1") // Username dose not exist.
                .build();
    }
}