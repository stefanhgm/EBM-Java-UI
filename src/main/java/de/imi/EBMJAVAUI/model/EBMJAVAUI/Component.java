package de.imi.EBMJAVAUI.model.EBMJAVAUI;

import de.imi.EBMJAVAUI.JSONConverter.ListDoubleConverter;
import de.imi.EBMJAVAUI.JSONConverter.ListIntegerConverter;
import de.imi.EBMJAVAUI.JSONConverter.ListStringConverter;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Model for component of a model.
 */
@Table(name = "COMPONENT", schema = "EBMJAVAUI")
@Entity
public class Component implements Serializable, Comparable<Component> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMPONENT_GENERATOR")
    @SequenceGenerator(name = "COMPONENT_GENERATOR", sequenceName = "COMPONENT_ID_SEQ", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    @Getter
    @Setter
    private long id;

    @ManyToOne
    @JoinColumn(name = "PREDICTION_MODEL_ID")
    @Getter
    @Setter
    private PredictionModel predictionModel;

    @Column(name = "INDEX")
    @Getter
    @Setter
    private int index;

    @Column(name = "FEATURE_NAME")
    @Getter
    @Setter
    private String featureName;

    @Column(name = "FEATURE_GROUP")
    @Getter
    @Setter
    @Convert(converter = ListIntegerConverter.class)
    private List<Integer> featureIdentifiers;

    @Column(name = "FEATURE_NAMES")
    @Getter
    @Setter
    @Convert(converter = ListStringConverter.class)
    private List<String> featureNames;

    @Column(name = "FEATURE_IMPORTANCE")
    @Getter
    @Setter
    private double featureImportance;

    @Column(name = "ADDITIVE_TERMS")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Object> risks;

    @Column(name = "TERM_STANDARD_DEVIATION")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Object> confidenceIntervals;

    @Column(name = "FEATURE_TYPES")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Object> featureTypes;

    @Column(name = "COL_BIN_COUNT")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Object> histogram;

    @Column(name = "COL_BIN_EDGES")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Object> continuous_bins_lower_bounds;

    @Column(name = "COL_MAPPING")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Map<String, Integer>> categorical_mapping;

    @Column(name = "COL_MAX_")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Object> max;

    @Column(name = "COL_MIN_")
    @Getter
    @Setter
    @Convert(converter = ListDoubleConverter.class)
    private List<Object> min;

    @Override
    public int compareTo(Component o) {
        return Double.compare(this.featureImportance, o.getFeatureImportance());
    }
}