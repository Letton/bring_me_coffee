package ru.letton.api.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import ru.letton.api.dto.request.CreateOrderRequest;
import ru.letton.api.dto.response.CustomErrorResponse;
import ru.letton.api.dto.response.GetOrdersResponse;
import ru.letton.api.dto.response.GetUserResponse;
import ru.letton.api.exceptions.BadRequestException;
import ru.letton.api.models.Order;
import ru.letton.api.models.User;
import ru.letton.api.services.OrderService;
import ru.letton.api.services.UserService;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrdersController {

    private final OrderService orderService;

    private final UserService userService;

    private final ModelMapper modelMapper;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("")
    Map<String, UUID> createOrder(@RequestBody @Valid CreateOrderRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            for (ObjectError error : bindingResult.getAllErrors()) {
                errors.append(error.getDefaultMessage()).append(";");
            }
            throw new BadRequestException(errors.toString());
        }
        UUID orderId = orderService.makeOrder(request, userService.getCurrentUser().getId());
        return Map.of("orderId", orderId);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    List<GetOrdersResponse> getOrders() {
        List<Order> orders = orderService.getOrders(userService.getCurrentUser().getId());
        return orders.stream().map(this::convertOrdersToGetOrdersResponse).collect(Collectors.toList());
    }

    @ExceptionHandler
    private ResponseEntity<CustomErrorResponse> handleException(BadRequestException e) {
        return new ResponseEntity<>(new CustomErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    private GetOrdersResponse convertOrdersToGetOrdersResponse(Order order) {
        return modelMapper.map(order, GetOrdersResponse.class);
    }
}
