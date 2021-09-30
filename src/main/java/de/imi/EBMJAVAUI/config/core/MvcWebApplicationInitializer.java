package de.imi.EBMJAVAUI.config.core;

import de.imi.EBMJAVAUI.config.AppConfig;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.annotation.Nonnull;
import javax.servlet.*;

/**
 * Main initializer class to load everything.
 */
public class MvcWebApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{AppConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return null;
    }

    @Override
    @Nonnull
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    public void onStartup(@Nonnull ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);

        // To correctly encode Umlaute (äöü) in the models.
        // With Spring Security we must set it in SecurityConfig configure(HttpSecurity http).
        // To redirect local resource URL to publicly available URLs
        FilterRegistration.Dynamic resourceUrlEncodingFilterRegistration;
        resourceUrlEncodingFilterRegistration = servletContext.addFilter("resourceUrlEncodingFilter",
                new ResourceUrlEncodingFilter());
        resourceUrlEncodingFilterRegistration.setInitParameter("encoding", "UTF-8");
        resourceUrlEncodingFilterRegistration.setInitParameter("forceEncoding", "true");
        resourceUrlEncodingFilterRegistration.addMappingForUrlPatterns(null, true, "/*");

    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        String TMP_FOLDER = "/tmp";
        int MAX_UPLOAD_SIZE = 20 * 1024 * 1024;
        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(TMP_FOLDER,
                MAX_UPLOAD_SIZE, MAX_UPLOAD_SIZE * 2, MAX_UPLOAD_SIZE / 2);

        registration.setMultipartConfig(multipartConfigElement);
    }

    @Override
    @Nonnull
    protected DispatcherServlet createDispatcherServlet(@Nonnull WebApplicationContext servletAppContext) {
        final DispatcherServlet dispatcherServlet = (DispatcherServlet) super.createDispatcherServlet(servletAppContext);
        dispatcherServlet.setThrowExceptionIfNoHandlerFound(true);
        return dispatcherServlet;
    }
}
