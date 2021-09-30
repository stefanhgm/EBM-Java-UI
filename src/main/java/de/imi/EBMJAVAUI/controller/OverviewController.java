package de.imi.EBMJAVAUI.controller;

import de.imi.EBMJAVAUI.dao.EBMJAVAUI.PredictionModelDao;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.PredictionModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Locale;

/**
 * Overview of the all models (validated and non-validated).
 */
@Controller
@RequestMapping("/overview")
public class OverviewController {
    private static final Logger LOGGER = LoggerFactory.getLogger(OverviewController.class);

    private final PredictionModelDao predictionModelDao;

    public OverviewController(PredictionModelDao predictionModelDao) {
        this.predictionModelDao = predictionModelDao;
    }

    @GetMapping
    public String overview(Model model, Locale locale) {
        List<PredictionModel> predictionModels = predictionModelDao.getAllElements();
        model.addAttribute("predictionModels", predictionModels);

        return "overview";
    }
}
