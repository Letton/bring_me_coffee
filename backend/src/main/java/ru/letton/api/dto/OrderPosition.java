package ru.letton.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.letton.api.models.Product;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderPosition extends Product {
    private int quantity;
}
