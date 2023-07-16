package com.example.mongodbtestprogram.Dto;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Entities.GeoLocationEntity;
import com.example.mongodbtestprogram.Entities.UserEntity;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Value
public class RideDTO {

    UUID rideId;

    UserEntity user;
    BikeEntity bike;

    LocalDateTime startTime; //  '1996-12-31T21:50:35.0' example.
    LocalDateTime endTime;

    List<GeoLocationEntity> locCheckpoints;

    Double rideLengthKM;
    String rideDuration;
    Double avgSpeedKMT;
}
