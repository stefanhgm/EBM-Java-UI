package de.imi.EBMJAVAUI.controller;

import de.imi.EBMJAVAUI.dao.EBMJAVAUI.PredictionModelDao;
import de.imi.EBMJAVAUI.dto.ComponentSelectionDto;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.Component;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.PredictionModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

/**
 * Validation overview for a trained model.
 */
@Controller
@RequestMapping("/validate")
public class ValidateController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ValidateController.class);

    private final PredictionModelDao predictionModelDao;

    public ValidateController(PredictionModelDao predictionModelDao) {
        this.predictionModelDao = predictionModelDao;
    }

    @GetMapping
    public String validate(@RequestParam(value = "identifier") String identifier,
                           Model model, Locale locale) {
        PredictionModel predictionModel = predictionModelDao.getPredictionModelByIdentifier(identifier);

        model.addAttribute("componentSelectionDto", new ComponentSelectionDto(predictionModel.getComponents()));
        model.addAttribute("modelIdentifier", identifier);

        return "validate";
    }

    @PostMapping(params = "validate")
    public String deleteModel(@RequestParam(value = "identifier") String identifier,
                              @ModelAttribute(name = "componentSelectionDto") ComponentSelectionDto componentSelectionDto,
                              Model model, Locale locale) {
        PredictionModel predictionModel = predictionModelDao.getPredictionModelByIdentifier(identifier);

        if(!predictionModel.isValidated()) {
            // Only keep selected risk functions.
            for (int i = 0; i < predictionModel.getComponents().size(); i++) {
                // Find correct selection entry for each component.
                Component component = predictionModel.getComponents().get(i);
                for (ComponentSelectionDto.ComponentSelection componentSelection : componentSelectionDto.getComponentSelections()) {
                    if (component.getIndex() == componentSelection.getIndex()) {
                        if (!componentSelection.selected) {
                            predictionModel.getComponents().remove(component);
                            i--;
                        }
                        break;
                    }
                }
            }

            // Set model as validated.
            predictionModel.setValidated(true);

            // Store validated prediction model.
            predictionModelDao.merge(predictionModel);
        }
        return "redirect:/overview";
    }

    @PostMapping(params = "cancel")
    public String cancelValidation(@RequestParam(value = "identifier") String identifier,
                                   Model model, Locale locale) {
        return "redirect:/overview";
    }
}
