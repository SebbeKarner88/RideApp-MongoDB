package com.example.mongodbtestprogram.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;

@AllArgsConstructor
@Getter
@Setter
public class StatsEntity {


    RideEntity ride;

    Double rideLength;
    LocalTime rideDuration;
    Double avgSpeed;
}
