package de.imi.EBMJAVAUI.service;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * A service for controller related tasks.
 */
@Service
public class ControllerService {

    private final MessageSource messageSource;

    public ControllerService(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * A helper function that automatically adds an info and redirects the model correctly to a standard page.
     */
    public String redirectToInfo(Model model, RedirectAttributes redirectAttributes, String message) {
        addInfo(model, message);
        modelToRedirectAttributes(model, redirectAttributes);
        return "redirect:/";
    }

    /**
     * A helper function that automatically adds an error and redirects the model correctly to a standard page.
     */
    public String redirectToError(Model model, RedirectAttributes redirectAttributes, String message) {
        addError(model, message);
        modelToRedirectAttributes(model, redirectAttributes);
        return "redirect:/";
    }

    /**
     * Try to infer whether the model contains a list of info messages already. If so, add info message, otherwise create
     * new such list and add it.
     */
    public void addInfo(Model model, String info) {
        List<String> currentInfo = new ArrayList<>();
        Object infoObject = model.asMap().get("info");
        if (infoObject instanceof List) {
            /*unchecked*/
            currentInfo = (List<String>) infoObject;
        }
        currentInfo.add(info);
        model.addAttribute("info", currentInfo);
    }

    /**
     * Try to infer whether the model contains a list of errors already. If so, add error message, otherwise create
     * new such list and add it.
     */
    public void addError(Model model, String error) {
        List<String> currentErrors = new ArrayList<>();
        Object errorsObject = model.asMap().get("errors");
        if (errorsObject instanceof List) {
            /*unchecked*/
            currentErrors = (List<String>) errorsObject;
        }
        currentErrors.add(error);
        model.addAttribute("error", true);
        model.addAttribute("errors", currentErrors);
    }

    public void modelToRedirectAttributes(Model model , RedirectAttributes redirectAttributes) {
        for(String key : model.asMap().keySet()) {
            redirectAttributes.addFlashAttribute(key, model.asMap().get(key));
        }
    }

    /**
     * A simple helper method that removes an attribute from the model.
     */
    public void removeModel(Model model, String attribute) {
        Map<String, Object> modelMap = model.asMap();
        modelMap.remove(attribute);
        model.addAllAttributes(modelMap);
    }
}
