package com.example.mongodbtestprogram.Controller;

import com.example.mongodbtestprogram.Dto.RideDTO;
import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rides")
public class RideController {

    private final RideService rideService;

    @Autowired
    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping("/add")
    public RideEntity addRide(@RequestBody RideEntity rideEntity) {
        return rideService.addRide(rideEntity);
    }

    @GetMapping("/getAll")
    public List<RideDTO> getAllUsers() {
        return rideService.getAll()
                .stream()
                .map(RideController::torideDTO)
                .collect(Collectors.toList());
    }


    private static RideDTO torideDTO(RideEntity rideEntity) {
        return new RideDTO(
                rideEntity.getUser(),
                rideEntity.getBike(),
                rideEntity.getStartTime(),
                rideEntity.getEndTime(),
                rideEntity.getStartLoc(),
                rideEntity.getEndLoc()
        );
    }
}
