package de.imi.EBMJAVAUI.JSONConverter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.Map;

/**
 * de.imi.EBMJAVAUI.JSONConverter in EBM-Java-UI
 */
@Converter
public abstract class MapConverter<T, S> implements AttributeConverter<Map<T, S>, String> {

	@Override
	public String convertToDatabaseColumn(Map<T, S> object) {
		String json = null;
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			json = objectMapper.writeValueAsString(object);
		} catch (final JsonProcessingException e) {
			e.printStackTrace();
		}
		return json;
	}

	@Override
	public Map<T, S> convertToEntityAttribute(String json) {
		Map<T, S> object = null;
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			object = objectMapper.readValue(json, Map.class);
		} catch (final IOException e) {
			e.printStackTrace();
		}
		return object;
	}
}
