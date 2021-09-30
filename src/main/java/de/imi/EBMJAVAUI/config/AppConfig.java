package de.imi.EBMJAVAUI.config;

import de.imi.EBMJAVAUI.beans.CustomSessionLocaleResolver;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.resource.CssLinkResourceTransformer;
import org.springframework.web.servlet.resource.VersionResourceResolver;
import org.springframework.web.servlet.resource.WebJarsResourceResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;

import java.util.Locale;

/**
 * The main configuration class defining the the view.
 */
@EnableWebMvc
// Use default config config.properties for all three profiles and an
// additional specific configuration that may overwrite values.
@PropertySource("classpath:config.properties")
@PropertySource(value = "file:${config.location}/${config.name}", ignoreResourceNotFound = true)
@PropertySource(value = "classpath:git.properties", ignoreResourceNotFound = true)
@EnableSpringDataWebSupport
@ComponentScan(basePackages = {"de.imi.EBMJAVAUI.config",
        "de.imi.EBMJAVAUI.controller",
        "de.imi.EBMJAVAUI.dao",
        "de.imi.EBMJAVAUI.dao.impl",
        "de.imi.EBMJAVAUI.dto",
        "de.imi.EBMJAVAUI.model",
        "de.imi.EBMJAVAUI.service",
})
@EnableJpaRepositories(basePackages = {"de.imi.EBMJAVAUI.dao.repository"}, entityManagerFactoryRef = "EBMJAVAUI-EM")
@EnableTransactionManagement
@EnableScheduling
@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Bean
    public InternalResourceViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver
                = new InternalResourceViewResolver();
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("/WEB-INF/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }

    @Bean
    public TilesConfigurer tilesConfigurer() {
        TilesConfigurer tilesConfigurer = new TilesConfigurer();
        tilesConfigurer.setDefinitions("/WEB-INF/tiles-def.xml");
        return tilesConfigurer;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/overview");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
       
        /*
        Resolves resources to filename-(md5-hash)
        Resolves Webjars version-agnostic URLs
         */
        final int cachePeriod = 60 * 60 * 24 * 30 * 365;
        /* one year */

        registry.addResourceHandler("/static/css/**")
                .addResourceLocations("/css/")
                .setCachePeriod(cachePeriod)
                .resourceChain(true)
                .addTransformer(new CssLinkResourceTransformer())
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));

        registry.addResourceHandler("/static/js/**")
                .addResourceLocations("/js/")
                .setCachePeriod(cachePeriod)
                .resourceChain(true)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));

        registry.addResourceHandler("/img/**")
                .addResourceLocations("/img/")
                .setCachePeriod(cachePeriod)
                .resourceChain(true)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));

        registry.addResourceHandler("/static/**")
                .addResourceLocations("/webjars/")
                .setCachePeriod(cachePeriod)
                .resourceChain(true)
                .addResolver(new WebJarsResourceResolver());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
        localeChangeInterceptor.setParamName("lang");
        registry.addInterceptor(localeChangeInterceptor);
    }

    @Bean
    public LocaleResolver localeResolver() {
        CustomSessionLocaleResolver customSessionLocaleResolver = new CustomSessionLocaleResolver();
        customSessionLocaleResolver.setDefaultLocale(Locale.ENGLISH);
        return customSessionLocaleResolver;
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource
                = new ResourceBundleMessageSource();
        messageSource.setBasenames("/messages/Messages",
                "/messages/countryCodes",
                "/messages/languageCodes");
        messageSource.setUseCodeAsDefaultMessage(true);
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(0);
        return messageSource;
    }

    /**
     * Custom validator bean to use path to validation messages.
     */
    @Bean
    public LocalValidatorFactoryBean validator() {
        LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean();
        ResourceBundleMessageSource messageSource
                = new ResourceBundleMessageSource();
        messageSource.setBasenames("/messages/ValidationMessages");
        messageSource.setUseCodeAsDefaultMessage(true);
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(0);
        localValidatorFactoryBean.setValidationMessageSource(messageSource);
        return localValidatorFactoryBean;
    }

    @Override
    public Validator getValidator() {
        return validator();
    }

    @Bean
    public StandardServletMultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }
}
