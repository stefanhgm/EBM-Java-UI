package de.imi.EBMJAVAUI.controller;

import de.imi.EBMJAVAUI.dao.EBMJAVAUI.PredictionModelDao;
import de.imi.EBMJAVAUI.dto.ComponentSelectionDto;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.PredictionModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Locale;

/**
 * Model overview for a validated model.
 */
@Controller
@RequestMapping("/model")
public class ModelController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ModelController.class);

    private final PredictionModelDao predictionModelDao;

    public ModelController(PredictionModelDao predictionModelDao) {
        this.predictionModelDao = predictionModelDao;
    }

    @GetMapping
    public String model(@RequestParam(value = "identifier") String identifier,
                           Model model, Locale locale) {
        PredictionModel predictionModel = predictionModelDao.getPredictionModelByIdentifier(identifier);

        model.addAttribute("componentSelectionDto", new ComponentSelectionDto(predictionModel.getComponents()));
        model.addAttribute("modelIdentifier", identifier);

        return "model";
    }
}