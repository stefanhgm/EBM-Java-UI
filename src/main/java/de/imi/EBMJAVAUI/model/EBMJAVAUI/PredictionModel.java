package de.imi.EBMJAVAUI.model.EBMJAVAUI;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Model for trained prediction models.
 */
@Table(name = "PREDICTION_MODEL", schema = "EBMJAVAUI")
@Entity
public class PredictionModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PREDICTION_MODEL_GENERATOR")
    @SequenceGenerator(name = "PREDICTION_MODEL_GENERATOR", sequenceName = "PREDICTION_MODEL_ID_SEQ", allocationSize = 1)
    @Column(name = "ID", updatable = false, nullable = false)
    @Getter
    @Setter
    private long id;

    @Column(name = "MODEL_IDENTIFIER")
    @Getter
    @Setter
    private String modelIdentifier;

    @Column(name = "VALIDATED")
    @Getter
    @Setter
    private boolean validated;

    @Column(name = "INTERCEPT")
    @Getter
    @Setter
    private double intercept;

    @Column(name = "MAX_ABS_RISK_1D")
    @Getter
    @Setter
    private double maxAbsRisk1D;

    @Column(name = "MAX_ABS_RISK_2D")
    @Getter
    @Setter
    private double maxAbsRisk2D;

    @Column(name = "MODEL_COMMENT")
    @Getter
    @Setter
    private String modelComment;

    @OneToMany(mappedBy = "predictionModel", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Getter
    @Setter
    private List<Component> components;
}
