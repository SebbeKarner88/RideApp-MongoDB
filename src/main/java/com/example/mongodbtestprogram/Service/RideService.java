package com.example.mongodbtestprogram.Service;

import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Repositories.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;

    @Autowired
    public RideService(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }


    public List<RideEntity> getAll() {
       return rideRepository.findAll();
    }

    public RideEntity addRide(RideEntity rideEntity) {
        rideRepository.save(rideEntity);
        return rideEntity;
    }
}
