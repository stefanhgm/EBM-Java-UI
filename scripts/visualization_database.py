"""
Routines to interact with the database to store models for visualization.
"""
import hashlib
import json

import psycopg2


def create_connection(password):
    conn = psycopg2.connect(dbname='ebmjavaui-db', user='postgres', host='localhost', port='5432', password=password)
    return conn


def store_ebm_model(ebm, timestamp, password):
    conn = create_connection(password)
    cur = conn.cursor()

    m = hashlib.md5()
    m.update(timestamp.encode('utf-8'))

    max_abs_risk_1d = None
    max_abs_risk_2d = None
    try:
        max_abs_risk_1d = \
            max(map(lambda x: abs(max(x.min(), x.max(), key=abs)), filter(lambda x: x.ndim == 1, ebm.additive_terms_)))
    except ValueError:
        pass  # No 1d risk functions found.
    try:
        max_abs_risk_2d = \
            max(map(lambda x: abs(max(x.min(), x.max(), key=abs)), filter(lambda x: x.ndim == 2, ebm.additive_terms_)))
    except ValueError:
        pass  # No 2d risk functions found.
    insertion_dict = dict(
        model_identifier=m.hexdigest(),
        validated=False,
        intercept=ebm.intercept_[0],
        max_abs_risk_1d=max_abs_risk_1d,
        max_abs_risk_2d=max_abs_risk_2d,
        model_comment="Timestamp: " + timestamp,
    )
    insertion_statement = """
        insert into ebmjavaui.prediction_model (
                model_identifier, validated, intercept, max_abs_risk_1d, max_abs_risk_2d,
                model_comment
            ) values (%(model_identifier)s, %(validated)s, %(intercept)s, %(max_abs_risk_1d)s, %(max_abs_risk_2d)s, %(model_comment)s)
            returning id
    """
    cur.execute(insertion_statement, insertion_dict)
    prediction_model_id = cur.fetchone()[0]

    sum_of_importances = 0
    for i, importance in enumerate(ebm.feature_importances_):
        sum_of_importances += importance

    for idx, terms in enumerate(ebm.feature_groups_):
        insertion_statement = """
            insert into ebmjavaui.component (
                prediction_model_id, index, feature_name, feature_group, feature_names, feature_importance,
                additive_terms, term_standard_deviation, feature_types, col_bin_count, col_bin_edges, col_mapping, col_max_, col_min_             
            ) values (%(prediction_model_id)s, %(index)s, %(feature_name)s, %(feature_group)s,
                %(feature_names)s, %(feature_importance)s, %(additive_terms)s, %(term_standard_deviation)s, 
                %(feature_type)s, %(col_bin_count)s, %(col_bin_edges)s, %(col_mapping)s, %(col_max_)s, %(col_min_)s)
        """
        insertion_dict = dict()
        insertion_dict['prediction_model_id'] = prediction_model_id
        insertion_dict['index'] = idx
        insertion_dict["feature_name"] = ebm.feature_names[idx]
        insertion_dict["feature_group"] = json.dumps(terms)
        insertion_dict['feature_names'] = json.dumps([ebm.preprocessor_.col_names_[i] for i in terms])
        insertion_dict["feature_importance"] = ebm.feature_importances_[idx]/sum_of_importances
        insertion_dict["additive_terms"] = json.dumps(ebm.additive_terms_[idx].tolist())
        insertion_dict['term_standard_deviation'] = json.dumps(ebm.term_standard_deviations_[idx].tolist())
        #if 2D else 1D
        if ebm.feature_types[idx] == "interaction":
            insertion_dict["feature_type"] = json.dumps([ebm.feature_types[int(terms[0])], ebm.feature_types[int(terms[1])]])
            insertion_dict["col_bin_count"] = json.dumps([ebm.pair_preprocessor_.col_bin_counts_[terms[0]].tolist(), ebm.pair_preprocessor_.col_bin_counts_[terms[1]].tolist()])

            col_bin_edges = []
            col_mapping = []
            col_max_ = []
            col_min_ = []
            if ebm.pair_preprocessor_.col_types_[terms[0]] == 'continuous':
                col_bin_edges.append(ebm.pair_preprocessor_.col_bin_edges_[terms[0]].tolist())
                col_mapping.append({})
                col_max_.append([ebm.preprocessor_.col_max_[int(terms[0])]])
                col_min_.append([ebm.preprocessor_.col_min_[int(terms[0])]])
            elif ebm.pair_preprocessor_.col_types_[terms[0]] == 'categorical':
                col_bin_edges.append([])
                col_mapping.append(ebm.pair_preprocessor_.col_mapping_[terms[0]])
                col_max_.append([])
                col_min_.append([])
            else:
                raise ValueError(f"Unknown feature type detected: {ebm.preprocessor_.col_types_[idx]}.")
            if ebm.pair_preprocessor_.col_types_[terms[1]] == 'continuous':
                col_bin_edges.append(ebm.pair_preprocessor_.col_bin_edges_[terms[1]].tolist())
                col_mapping.append({})
                col_max_.append([ebm.preprocessor_.col_max_[int(terms[1])]])
                col_min_.append([ebm.preprocessor_.col_min_[int(terms[1])]])
            elif ebm.pair_preprocessor_.col_types_[terms[1]] == 'categorical':
                col_bin_edges.append([])
                col_mapping.append(ebm.pair_preprocessor_.col_mapping_[terms[1]])
                col_max_.append([])
                col_min_.append([])
            else:
                raise ValueError(f"Unknown feature type detected: {ebm.preprocessor_.col_types_[idx]}.")
            insertion_dict['col_bin_edges'] = json.dumps(col_bin_edges)
            insertion_dict['col_mapping'] = json.dumps(col_mapping)
            insertion_dict['col_max_'] = json.dumps(col_max_)
            insertion_dict['col_min_'] = json.dumps(col_min_)
        else:
            insertion_dict["feature_type"] = json.dumps([ebm.feature_types[idx]])
            insertion_dict["col_bin_count"] = json.dumps(ebm.preprocessor_.col_bin_counts_[idx].tolist())
            if ebm.preprocessor_.col_types_[idx] == 'continuous':
                insertion_dict['col_bin_edges'] = json.dumps(
                    ebm.preprocessor_.col_bin_edges_[idx].tolist())
                insertion_dict['col_mapping'] = json.dumps([])
                insertion_dict["col_max_"] = json.dumps([ebm.preprocessor_.col_max_[idx]])
                insertion_dict["col_min_"] = json.dumps([ebm.preprocessor_.col_min_[idx]])
            elif ebm.preprocessor_.col_types_[idx] == 'categorical':
                insertion_dict['col_bin_edges'] = json.dumps([])
                col_mapping = ebm.preprocessor_.col_mapping_[idx]
                insertion_dict['col_mapping'] = json.dumps([col_mapping])
                insertion_dict["col_max_"] = json.dumps([])
                insertion_dict["col_min_"] = json.dumps([])
            else:
                raise ValueError(f"Unknown feature type detected: {ebm.preprocessor_.col_types_[idx]}.")

        cur.execute(insertion_statement, insertion_dict)
    conn.commit()
