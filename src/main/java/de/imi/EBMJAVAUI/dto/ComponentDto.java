package de.imi.EBMJAVAUI.dto;

import de.imi.EBMJAVAUI.model.EBMJAVAUI.Component;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.util.List;
import java.util.Map;

/**
 * A wrapper that contains all information for a model.
 */
public class ComponentDto {

    @Getter
    @Setter
    private int index;

    @Getter
    @Setter
    private String featureName;

    @Getter
    @Setter
    private List<Object> featureTypes;

    @Getter
    @Setter
    private List<String> featureNames;

    @Getter
    @Setter
    private List<Integer> featureGroup;

    @Column(name = "IMPORTANCE")
    @Getter
    @Setter
    private double featureImportance;

    @Getter
    @Setter
    private List<Object> risks;

    @Getter
    @Setter
    private List<Object> confidenceIntervals;

    @Getter
    @Setter
    private List<Object> histogram;

    @Getter
    @Setter
    private List<Object> continuous_bins_lower_bounds;

    @Getter
    @Setter
    private List<Map<String, Integer>> categorical_mapping;

    @Getter
    @Setter
    private List<Object> max;

    @Getter
    @Setter
    private List<Object> min;


    public ComponentDto(Component component) {
        this.index = component.getIndex();
        this.featureName = component.getFeatureName();
        this.featureTypes = component.getFeatureTypes();
        this.featureNames = component.getFeatureNames();
        this.featureGroup = component.getFeatureIdentifiers();
        this.featureImportance = component.getFeatureImportance();
        this.risks = component.getRisks();
        this.confidenceIntervals = component.getConfidenceIntervals();
        this.histogram = component.getHistogram();
        this.continuous_bins_lower_bounds = component.getContinuous_bins_lower_bounds();
        this.categorical_mapping = component.getCategorical_mapping();
        this.max = component.getMax();
        this.min = component.getMin();
    }
}

