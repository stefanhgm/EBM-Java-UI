package de.imi.EBMJAVAUI.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Locale;

/**
 * The root controller adds some standard models to all other controllers such as the locale and messages.
 */
@ControllerAdvice
public class RootController {
    /**
     * Making the locale accessible on every page.
     */
    @ModelAttribute
    public void addLocale(Model model, Locale locale) {
        model.addAttribute("locale", locale);
    }
}
