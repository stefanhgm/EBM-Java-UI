package de.imi.EBMJAVAUI.controller;

import de.imi.EBMJAVAUI.dao.EBMJAVAUI.ComponentDao;
import de.imi.EBMJAVAUI.dao.EBMJAVAUI.PredictionModelDao;
import de.imi.EBMJAVAUI.dto.ComponentDto;
import de.imi.EBMJAVAUI.dto.PredictionModelDto;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.Component;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.PredictionModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

/**
 * REST controller for some simple API operations.
 */
@RestController
@RequestMapping(value = "/api/v1/", produces = "application/json")
public class APIController {
    private static final Logger LOGGER = LoggerFactory.getLogger(APIController.class);

    private final PredictionModelDao predictionModelDao;
    private final ComponentDao componentDao;

    public APIController(PredictionModelDao predictionModelDao, ComponentDao componentDao) {
        this.predictionModelDao = predictionModelDao;
        this.componentDao = componentDao;
    }

    /**
     * Retrieves information of a prediction model.
     */
    @GetMapping(value = "prediction-model")
    public PredictionModelDto predictionModel(@RequestParam(value = "identifier", required = true) String identifier) {
        PredictionModel predictionModel = predictionModelDao.getPredictionModelByIdentifier(identifier);

        // Sort components according to importance
        predictionModel.getComponents().sort(Collections.reverseOrder());
        return new PredictionModelDto(predictionModel);
    }

    /**
     * Retrieve information of a plot.
     */
    @GetMapping(value = "component")
    public ComponentDto component(@RequestParam(value = "identifier", required = true) String identifier,
                                  @RequestParam(value = "index", required = true) int index) {
        PredictionModel predictionModel = predictionModelDao.getPredictionModelByIdentifier(identifier);
        Component component = new Component();
        for(Component modelComponent : predictionModel.getComponents()) {
            if(modelComponent.getIndex() == index)
                component = modelComponent;
        }
        return new ComponentDto(component);
    }
}