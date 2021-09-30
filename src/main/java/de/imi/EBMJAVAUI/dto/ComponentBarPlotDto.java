package de.imi.EBMJAVAUI.dto;

import de.imi.EBMJAVAUI.model.EBMJAVAUI.Component;
import lombok.Getter;
import lombok.Setter;

public class ComponentBarPlotDto {

    @Getter
    @Setter
    private long index;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private double importance;

    public ComponentBarPlotDto(Component component) {
        this.index = component.getIndex();
        this.name = component.getFeatureName();
        this.importance = component.getFeatureImportance();
    }
}
