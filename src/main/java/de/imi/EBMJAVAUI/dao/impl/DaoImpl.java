package de.imi.EBMJAVAUI.dao.impl;

import de.imi.EBMJAVAUI.dao.Dao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Implementation of the generic Dao interface, which is inherited by daos within the application.
 *
 * Implements CRUD methods for all daos.
 */
@Component
public abstract class DaoImpl<T> implements Dao<T> {
    private static final Logger LOGGER = LoggerFactory.getLogger(DaoImpl.class);

    // Provides the EntityManager, which manages the persistence layer
    @PersistenceContext(unitName = "EBMJAVAUI-EM")
    protected EntityManager ebmjavauiEntityManager;

    // Holds the generic entity class T
    private final Class<T> entityClass;


    @PersistenceContext(unitName = "EBMJAVAUI-EM")
    public void setEntityManager(EntityManager mdmjEntityManager) {
            this.ebmjavauiEntityManager = mdmjEntityManager;
    }

    /**
     * Constructor, which gets the generic class T
     */
    @SuppressWarnings("unchecked")
    public DaoImpl() {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        entityClass = (Class) pt.getActualTypeArguments()[0];

        //FIXME: PersistenceContext achten!
       /* if (this.mdmjEntityManager == null) {
            EntityManagerFactory emf = Persistence.createEntityManagerFactory("DMMigrate");
            this.mdmjEntityManager = emf.createEntityManager();
        }*/
    }

    /**
     * Returns the entity class of the current dao implementation.
     *
     * @return The entity class of the current dao implementation.
     */
    protected Class<T> getEntityClass() {
        return entityClass;
    }

    @Override
    @Transactional
    public T getElementById(Long id) {
        try {
            TypedQuery<T> query = ebmjavauiEntityManager.createQuery(
                    "SELECT e FROM " + getEntityClass().getSimpleName() + " e WHERE e.id=" + (id), getEntityClass());
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @SuppressWarnings("unused")
    @Transactional
    public T getElementByUUID(String uuid) {
        try {
            TypedQuery<T> query = ebmjavauiEntityManager.createQuery(
                    "SELECT e FROM " + getEntityClass().getSimpleName() + " e WHERE e.uuid='" + (uuid) + "'", getEntityClass());
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @SuppressWarnings({"unchecked", "unused"})
    @Transactional
    public Collection<T> getElementsById(Collection<Long> ids) {
        Collection<T> elements = new ArrayList<>();
        if (!ids.isEmpty()) {
            Query query = ebmjavauiEntityManager.createQuery("SELECT e FROM " + getEntityClass().getSimpleName() + " e WHERE e.id IN :ids");
            query.setParameter("ids", ids);
            elements = query.getResultList();
        }
        return elements;
    }

    @Override
    @Transactional
    public List<T> getAllElements() {
        TypedQuery<T> query = ebmjavauiEntityManager.createQuery(
                "SELECT e FROM " + getEntityClass().getSimpleName() + " e", getEntityClass());
        return query.getResultList();
    }

    @Override
    @Transactional
    public List<Long> getAllElementIds() {
        TypedQuery<Long> query = ebmjavauiEntityManager.createQuery(
                "SELECT e.id FROM " + getEntityClass().getSimpleName() + " e", Long.class);
        return query.getResultList();
    }

    @SuppressWarnings("unused")
    @Transactional
    public Long getCount() {
        TypedQuery<Long> query = ebmjavauiEntityManager.createQuery(
                "SELECT count(e) FROM " + getEntityClass().getSimpleName() + " e", Long.class);
        return query.getSingleResult();
    }

    @Override
    @Transactional
    public Long merge(T element) {
        try {
            // Cast the element to the appropriate entity class
            getEntityClass().cast(element);
            // Get the getId method for the element
            Method method = element.getClass().getMethod("getId");
            // Update the element
            return (Long) method.invoke(ebmjavauiEntityManager.merge(element));
        } catch (IllegalArgumentException | InvocationTargetException | IllegalAccessException | NoSuchMethodException | SecurityException ex) {
            LOGGER.error("Error while saving entity of type {}. Check if there is a consistent database.", getEntityClass().getName());
        }
        return null;
    }

    @Override
    @Transactional
    public void create( T element ) {
        try {
            // Cast the element to the appropriate entity class
            getEntityClass().cast(element);
            // Save element to the database
            ebmjavauiEntityManager.persist(element);
        } catch (IllegalArgumentException | SecurityException ex) {
            LOGGER.error("Error while saving entity of type {}. Check if there is a consistent database.", getEntityClass().getName());
        }
    }

    @Override
    @Transactional
    public void remove(T element) {
        ebmjavauiEntityManager.remove(ebmjavauiEntityManager.merge(element));
    }
}