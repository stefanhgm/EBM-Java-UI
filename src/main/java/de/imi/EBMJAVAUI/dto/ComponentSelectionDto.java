package de.imi.EBMJAVAUI.dto;

import de.imi.EBMJAVAUI.model.EBMJAVAUI.Component;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class ComponentSelectionDto {

    @Getter
    @Setter
    List<ComponentSelection> componentSelections;

    public ComponentSelectionDto() {
        componentSelections = new ArrayList<>();
    }

    public ComponentSelectionDto(List<Component> components) {
        componentSelections = new ArrayList<>();
        for(Component component : components) {
            ComponentSelection componentSelection = new ComponentSelection();
            componentSelection.setIndex(component.getIndex());
            componentSelection.setSelected(false);
            componentSelections.add(componentSelection);
        }
    }

    public static class ComponentSelection {
        @Getter
        @Setter
        private Integer index;

        @Getter
        @Setter
        public Boolean selected;

        public ComponentSelection() {}
    }
}
