package de.imi.EBMJAVAUI.JSONConverter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.List;

/**
 * de.imi.EBMJAVAUI.JSONConverter in EBM-Java-UI
 */
@Converter
public abstract class ListConverter<T> implements AttributeConverter<List<T>, String> {

	@Override
	public String convertToDatabaseColumn(List<T> object) {
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
	public List<T> convertToEntityAttribute(String json) {
		List<T> object = null;
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			object = objectMapper.readValue(json, List.class);
		} catch (final IOException e) {
			e.printStackTrace();
		}
		return object;
	}
}
