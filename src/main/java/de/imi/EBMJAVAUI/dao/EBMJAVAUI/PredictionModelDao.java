package de.imi.EBMJAVAUI.dao.EBMJAVAUI;

import de.imi.EBMJAVAUI.dao.Dao;
import de.imi.EBMJAVAUI.model.EBMJAVAUI.PredictionModel;
import org.springframework.stereotype.Component;

@Component
public interface PredictionModelDao extends Dao<PredictionModel> {

    /**
     * Retrieve basic model information.
     */
    PredictionModel getPredictionModelByIdentifier(String identifier);
}
