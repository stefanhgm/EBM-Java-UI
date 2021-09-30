package de.imi.EBMJAVAUI.model.EBMJAVAUI;

import de.imi.EBMJAVAUI.JSONConverter.ListDoubleConverter;
import de.imi.EBMJAVAUI.JSONConverter.ListIntegerConverter;
import de.imi.EBMJAVAUI.JSONConverter.MapStringIntegerConverter;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Model for feature of a model.
 */
@Table(name = "FEATURE", schema = "EBMJAVAUI")
@Entity
public class Feature implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FEATURE_GENERATOR")
    @SequenceGenerator(name = "FEATURE_GENERATOR", sequenceName = "FEATURE_ID_SEQ", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    @Getter
    @Setter
    private long id;

    @ManyToOne
    @JoinColumn(name = "PREDICTION_MODEL_ID")
    @Getter
    @Setter
    private PredictionModel predictionModel;

    @Column(name = "IDENTIFIER")
    @Getter
    @Setter
    private long identifier;

    @Column(name = "NAME")
    @Getter
    @Setter
    private String name;

    @Column(name = "TYPE")
    @Getter
    @Setter
    private String type;

    @Column(name = "CONTINUOUS_BINS_LOWER_BOUNDS")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Double> continuous_bins_lower_bounds;

    @Column(name = "CATEGORICAL_MAPPING")
    @Getter
    @Setter
    @Convert(converter = MapStringIntegerConverter.class)
    private Map<String, Integer> categorical_mapping;

    @Column(name = "HISTOGRAM")
    @Getter
    @Setter
    @Convert(converter = ListIntegerConverter.class)
    private List<Integer> histogram;

}