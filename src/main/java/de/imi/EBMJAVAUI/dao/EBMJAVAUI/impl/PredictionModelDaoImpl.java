package de.imi.EBMJAVAUI.dao.EBMJAVAUI.impl;

import de.imi.EBMJAVAUI.dao.EBMJAVAUI.PredictionModelDao;
import de.imi.EBMJAVAUI.dao.impl.DaoImpl;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.PredictionModel;
import org.springframework.stereotype.Component;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

@Component
public class PredictionModelDaoImpl extends DaoImpl<PredictionModel> implements PredictionModelDao {

    @Override
    public PredictionModel getPredictionModelByIdentifier(String identifier) {
        try {
            TypedQuery<PredictionModel> query = ebmjavauiEntityManager.createQuery(
                    "SELECT e FROM " + getEntityClass().getSimpleName() + " e WHERE e.modelIdentifier = :identifier", getEntityClass());
            query.setParameter("identifier", identifier);
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
