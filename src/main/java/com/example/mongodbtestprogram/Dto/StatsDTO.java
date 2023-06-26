package com.example.mongodbtestprogram.Dto;

import com.example.mongodbtestprogram.Entities.RideEntity;
import lombok.Value;

import java.time.LocalTime;

@Value
public class StatsDTO {

    RideEntity ride;

    Double rideLength;
    LocalTime rideDuration;
    Double avgSpeed;
}
