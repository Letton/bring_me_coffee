package ru.letton.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.letton.api.dto.OrderPosition;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrderRequest {
    @NotEmpty(message = "Заказ должен содержать хотя бы один товар")
    private List<OrderPosition> items;
    @NotBlank(message = "Заказ должен содержать адресс доставки")
    private String address;
}
