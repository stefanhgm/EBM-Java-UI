package de.imi.EBMJAVAUI.dto;

import de.imi.EBMJAVAUI.model.EBMJAVAUI.PredictionModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

/**
 * A wrapper that contains all information for a model.
 */
public class PredictionModelDto {

    @Getter
    @Setter
    private String modelIdentifier;

    @Getter
    @Setter
    private boolean validated;

    @Getter
    @Setter
    private double intercept;

    @Getter
    @Setter
    private double maxAbsRisk1D;

    @Getter
    @Setter
    private double maxAbsRisk2D;

    @Getter
    @Setter
    private String modelComment;

    @Getter
    @Setter
    private List<ComponentBarPlotDto> componentBarPlotDtos;

    public PredictionModelDto(PredictionModel predictionModel) {
        this.modelIdentifier = predictionModel.getModelIdentifier();
        this.validated = predictionModel.isValidated();
        this.intercept = predictionModel.getIntercept();
        this.maxAbsRisk1D = predictionModel.getMaxAbsRisk1D();
        this.maxAbsRisk2D = predictionModel.getMaxAbsRisk2D();
        this.modelComment = predictionModel.getModelComment();
        this.componentBarPlotDtos = predictionModel.getComponents().stream().
                map(ComponentBarPlotDto::new).collect(Collectors.toList());
    }
}

