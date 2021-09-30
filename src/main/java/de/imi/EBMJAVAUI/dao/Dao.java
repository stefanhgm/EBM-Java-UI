package de.imi.EBMJAVAUI.dao;

import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Generic interface, which is implemented by all data access objects (daos).
 *
 * Provides CRUD methods for all daos.
 */
@Component
public interface Dao<T> {

    /**
     * Searches for a element of type <T> by id.
     *
     * @param id Id of the searched element.
     *
     * @return The element, which was found by its id. If non has been found,
     * <code>null</code>.
     */
    //@PostAuthorize("hasRole('ROLE_ADMIN') OR hasPermission(returnObject, 'READ')")
    T getElementById(Long id);

    /**
     * Returns all elements of Type <T> in the database.
     *
     * @return All elements of type <T> within the database.
     */
    //@PostFilter("hasRole('ROLE_ADMIN') OR hasPermission(filterObject, 'READ')")
    List<T> getAllElements();

    /**
     * Returns all ids of type Long of the elements in the database.
     *
     * @return All ids of type Long of the elements in the database.
     */
    //@PostFilter("hasRole('ROLE_ADMIN') OR hasPermission(filterObject, 'READ')")
    List<Long> getAllElementIds();

    /**
     * Persists a object which is defined in the model class of the given type
     * <T>. Persists the access control list information for this object.
     *
     * @param element The <T> object, which will be added or changed in the
     * database.
     */
    // @PreAuthorize("hasRole('ROLE_ADMIN') OR hasPermission(#element, 'WRITE')")
    Long merge(T element);

    /**
     * Creates a object with a given ID.
     *
     * @warning Use with care! Normally not neccessary!
     */
    void create(T element);

    /**
     * Removes a object which is defined in the model class of the given type
     * <T>.
     *
     * @param element The <T> object, which will be removed in the database.
     */
    // @PreAuthorize("hasRole('ROLE_ADMIN') OR hasPermission(#element, 'WRITE')")
    void remove(T element);

}