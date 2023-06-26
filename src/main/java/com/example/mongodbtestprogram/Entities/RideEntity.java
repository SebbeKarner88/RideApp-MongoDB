package com.example.mongodbtestprogram.Entities;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document("rides")
@AllArgsConstructor
@Getter
@Setter
public class RideEntity {

    UserEntity user;
    BikeEntity bike;

    LocalDateTime startTime; //  '1996-12-31T21:50:35.0' example.
    LocalDateTime endTime;

    GeoLocationEntity startLoc;
    GeoLocationEntity endLoc;

    Double rideLengthKM;
    String rideDuration;
    Double avgSpeedKMT;

}