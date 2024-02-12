package com.example.mongodbtestprogram.Controller;

import com.example.mongodbtestprogram.Dto.RideDTO;
import com.example.mongodbtestprogram.Entities.GeoLocationEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;
import com.example.mongodbtestprogram.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
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
    public RideEntity addRide(@RequestHeader UUID userId,
                              @RequestHeader UUID bikeId,
                              @RequestBody RideEntity rideEntity) {
        return rideService.addRide(userId, bikeId, rideEntity);
    }

    @PostMapping("/addCheckpoint")
    public RideEntity addCheckpoint(@RequestHeader UUID rideId,
                                    @RequestBody List<GeoLocationEntity> geoLocationEntity) {
        return rideService.addCheckpoints(rideId, geoLocationEntity);
    }

    @GetMapping("/getAll")
    public List<RideDTO> getAllRides() {
        return rideService.getAll()
                .stream()
                .map(RideController::toRideDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/getAllByUserId")
    public List<RideDTO> getAllByUserId(@RequestHeader String userId) {
        return rideService.getAllByUserId(userId)
                .stream()
                .map(RideController::toRideDTO)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/deleteById")
    public Boolean deleteById(@RequestHeader UUID rideId) {
        return rideService.deleteById(rideId);
    }

    private static RideDTO toRideDTO(RideEntity rideEntity) {
        return new RideDTO(
                rideEntity.getRideId(),
                rideEntity.getUser(),
                rideEntity.getBike(),
                rideEntity.getStartTime(),
                rideEntity.getEndTime(),
                rideEntity.getLocCheckpoints(),
                rideEntity.getRideLengthKM(),
                rideEntity.getRideDuration(),
                rideEntity.getAvgSpeedKMT()
        );
    }
}
