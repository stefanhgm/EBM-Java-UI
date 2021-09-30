package de.imi.EBMJAVAUI.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

/**
 * Configuration of the persistence.
 */
@Configuration
@EnableTransactionManagement
public class PersistenceConfig {

    private final Environment environment;

    public PersistenceConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean(name = "EBMJAVAUI-EM")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan("de.imi.EBMJAVAUI.model",
                "de.imi.EBMJAVAUI.JSONConverter");
        JpaVendorAdapter vendorAdapter = new EclipseLinkJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Properties properties = new Properties();
        properties.setProperty("eclipselink.weaving", "static");
        properties.setProperty("eclipselink.ddl-generation", "none");
        em.setJpaProperties(properties);

        return em;
    }

    @Bean
    public DataSource dataSource(){
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://" + environment.getProperty("datasource.url")
                + "?autoReconnect=true&amp;useUnicode=true&amp;characterEncoding=UTF-8");
        dataSource.setUsername(environment.getProperty("datasource.username"));
        dataSource.setPassword(environment.getProperty("datasource.password"));

        Properties properties = new Properties();
        properties.setProperty("initialPoolSize", "10");
        properties.setProperty("minPoolSize", "5");
        properties.setProperty("maxPoolSize", "20");
        properties.setProperty("acquireIncrement", "1");
        properties.setProperty("idleConnectionTestPeriod", "1800");
        properties.setProperty("maxIdleTimeExcessConnections", "1800");
        properties.setProperty("testConnectionOnCheckin", "true");
        dataSource.setConnectionProperties(properties);

        return dataSource;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf);

        return transactionManager;
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation(){
        return new PersistenceExceptionTranslationPostProcessor();
    }
}