package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Entities.BikeEntity;
import com.example.mongodbtestprogram.Repositories.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BikeService {

    private final BikeRepository bikeRepository;

    @Autowired
    public BikeService(BikeRepository bikeRepository) {
        this.bikeRepository = bikeRepository;
    }


    public BikeEntity addBike(BikeEntity bikeEntity) {
        bikeRepository.save(bikeEntity);
        return bikeEntity;
    }

    public List<BikeEntity> getAllBikes() {
        return bikeRepository.findAll();
    }

    public List<BikeEntity> getBikeByType(String type) {
        return bikeRepository.findByType(type);
    }

    public List<BikeEntity> getBikeByMaker(String maker) {
        return bikeRepository.findByMaker(maker);
    }

    public List<BikeEntity> getBikeByModel(String model) {
        return bikeRepository.findByModel(model);
    }

}
