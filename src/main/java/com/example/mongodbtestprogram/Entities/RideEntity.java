package com.example.mongodbtestprogram.Entities;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Document("rides")
@AllArgsConstructor
@Getter
@Setter
public class RideEntity {
    @MongoId
    UUID rideId;
    UserEntity user;
    BikeEntity bike;

    LocalDateTime startTime; //  '1996-12-31T21:50:35.0' example.
    LocalDateTime endTime;

    List <GeoLocationEntity> locCheckpoints;

    Double rideLengthKM;
    String rideDuration;
    Double avgSpeedKMT;

}