package com.example.mongodbtestprogram.Functions;

import com.example.mongodbtestprogram.Entities.GeoLocationEntity;
import com.example.mongodbtestprogram.Entities.RideEntity;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class Calculations {

    public static BigDecimal calcTotalDistance(RideEntity rideEntity) {
        List<Double> checkpointDistance = new ArrayList<>();
        for (int i = 0; i < rideEntity.getLocCheckpoints().size() - 1; i++) {
            Double distance = Calculations.distance(
                    rideEntity.getLocCheckpoints().get(i),
                    rideEntity.getLocCheckpoints().get(i + 1));
            checkpointDistance.add(distance);
        }
        Double totalDistance = checkpointDistance
                .stream()
                .reduce(0d, Double::sum);
        return new BigDecimal(totalDistance).setScale(2, RoundingMode.HALF_UP);
    }

    public static String formatDuration(Duration duration) {
        long seconds = duration.getSeconds();
        long absSeconds = Math.abs(seconds);
        String positive = String.format(
                "%d:%02d:%02d",
                absSeconds / 3600,
                (absSeconds % 3600) / 60,
                absSeconds % 60);
        return seconds < 0 ? "-" + positive : positive;
    }

    public static double distance(GeoLocationEntity loc1, GeoLocationEntity loc2) {
        double lat1 = loc1.getLatitude();
        double lat2 = loc2.getLatitude();
        double lon1 = loc1.getLongitude();
        double lon2 = loc2.getLongitude();
        // Converts from degrees to radians.
        lon1 = Math.toRadians(lon1);
        lon2 = Math.toRadians(lon2);
        lat1 = Math.toRadians(lat1);
        lat2 = Math.toRadians(lat2);
        // Haversine formula
        double dlon = lon2 - lon1;
        double dlat = lat2 - lat1;
        double a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.pow(Math.sin(dlon / 2), 2);
        double c = 2 * Math.asin(Math.sqrt(a));
        // Radius of earth in kilometers.
        // Use 3956 for miles
        double r = 6371;
        return (c * r);
    }
}
