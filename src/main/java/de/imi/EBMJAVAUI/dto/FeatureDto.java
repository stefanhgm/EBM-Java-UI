package de.imi.EBMJAVAUI.dto;

import de.imi.EBMJAVAUI.model.EBMJAVAUI.Feature;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

/**
 * de.imi.EBMJAVAUI.dto in EBM-Java-UI
 */
public class FeatureDto {

    @Getter
    @Setter
    private long identifier;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String type;

    @Getter
    @Setter
    private List<Double> continuous_bins_lower_bounds;

    @Getter
    @Setter
    private Map<String, Integer> categorical_mapping;

    @Getter
    @Setter
    private List<Integer> histogram;

    @Getter
    @Setter
    private boolean unknownExists;

    @Getter
    @Setter
    private String unknownIndicator;


    public FeatureDto(Feature feature) {
        this.identifier = feature.getIdentifier();
        this.name = feature.getName();
        this.type = feature.getType();
        this.continuous_bins_lower_bounds = feature.getContinuous_bins_lower_bounds();
        this.categorical_mapping = feature.getCategorical_mapping();
        this.histogram = feature.getHistogram();
    }
}
