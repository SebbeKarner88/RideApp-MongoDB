package com.example.mongodbtestprogram.Dto;

import com.example.mongodbtestprogram.Enum.Sizes;
import lombok.Value;

import java.util.UUID;

@Value
public class BikeDTO {

    UUID bikeId;
    String maker;
    String model;
    Sizes size;
    String[] pictures;
    Long year;
    String type;
    String[] colors;
    String material;
    Double wheelSize;
    String gears;
    Boolean eBike;
}
