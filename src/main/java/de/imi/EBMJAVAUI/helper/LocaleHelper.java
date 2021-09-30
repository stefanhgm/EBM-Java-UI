package de.imi.EBMJAVAUI.helper;

import java.util.LinkedHashMap;
import java.util.Locale;

/**
 * A helper for specific task that are necessary for localization in this project. E.g. for the website only the
 * locales en/de are supported.
 */
public class LocaleHelper {

    /**
     * Helper that checks whether locale represent German.
     */
    public static boolean isGerman(Locale locale) {
        return locale != null && locale.equals(new Locale("de"));
    }

    /**
     * Helper that checks whether locale represent English.
     */
    public static boolean isEnglish(Locale locale) {
        return locale != null && locale.equals(new Locale("en"));
    }

    /**
     * Retrieve an encoding of the language and country code separated by a dash.
     */
    public static String encodeLocale(Locale locale) {
        return locale.getLanguage() + "-" + locale.getCountry();
    }

    /**
     * Decode a combination of a language and country code.
     */
    public static Locale decodeLocale(String localeCode) {

        if (localeCode.contains("-"))
            return new Locale(localeCode.split("-")[0], localeCode.split("-")[1]);

        if (localeCode.contains("_"))
            return new Locale(localeCode.split("_")[0], localeCode.split("_")[1]);

        return new Locale(localeCode);
    }

    /**
     * Analogously to the toolbar.jsp, list the languages in their respective spelling.
     */
    public static LinkedHashMap<String, String> languageOptions() {
        LinkedHashMap<String, String> result = new LinkedHashMap<>();
        result.put("de", "Deutsch");
        result.put("en", "English");
        result.put("es", "Español");
        result.put("it", "Italiano");
        result.put("fr", "Français");
        result.put("pt", "Português");
        result.put("sv", "Svenska");
        result.put("nl", "Nederlands");
        return result;
    }

}
