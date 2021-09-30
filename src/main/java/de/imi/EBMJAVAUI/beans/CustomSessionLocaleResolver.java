package de.imi.EBMJAVAUI.beans;

import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import javax.annotation.Nonnull;
import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

/**
 * CustomSessionLocaleResolver a custom SessionLocaleResolver that only uses
 * the locales en and de and tries to resolve one of these from the user.
 */
public class CustomSessionLocaleResolver extends SessionLocaleResolver {

    /**
     * Only use default locale if neither "de" nor "en" can be derived from
     * the request locale.
     */
    @Nonnull
    protected Locale determineDefaultLocale(HttpServletRequest request) {
        Locale requestLocale = request.getLocale();
        if(requestLocale.toString().startsWith("en"))
            return Locale.ENGLISH;
        if(requestLocale.toString().startsWith("de"))
            return Locale.GERMAN;
        if(getDefaultLocale() == null)
            return Locale.ENGLISH;
        return getDefaultLocale();
    }
}
