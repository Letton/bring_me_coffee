package ru.letton.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.letton.api.dto.request.CreateOrderRequest;
import ru.letton.api.dto.OrderPosition;
import ru.letton.api.exceptions.BadRequestException;
import ru.letton.api.models.Order;
import ru.letton.api.models.OrderProduct;
import ru.letton.api.models.Product;
import ru.letton.api.models.User;
import ru.letton.api.repositories.OrderProductRepository;
import ru.letton.api.repositories.OrderRepository;
import ru.letton.api.repositories.ProductRepository;
import ru.letton.api.repositories.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final OrderProductRepository orderProductRepository;

    public UUID makeOrder(CreateOrderRequest orderData, UUID userId) {
        Order order = new Order();
        order.setCreationDate(new Date());
        order.setStatus("В обработке");
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty())
            throw new BadRequestException("Пользователь не найден");

        order.setUser(user.get());
        order.setAddress(orderData.getAddress());
        double total = 0;
        for (OrderPosition orderPosition : orderData.getItems()) {
            Product product = productRepository.findById(orderPosition.getId()).orElseThrow();
            total += product.getPrice() * orderPosition.getQuantity();
        }
        order.setTotal(total);
        orderRepository.save(order);
        for (OrderPosition orderPosition : orderData.getItems()) {
            Product product = productRepository.findById(orderPosition.getId()).orElseThrow();
            total +=  product.getPrice() * orderPosition.getQuantity();
            OrderProduct orderProduct = OrderProduct.builder()
                    .order(order)
                    .product(product)
                    .quantity(orderPosition.getQuantity())
                    .build();
            orderProductRepository.save(orderProduct);
        }


        return order.getId();
    }

    public List<Order> getOrders(UUID userId) {
        return orderRepository.findAllByUserId(userId);
    }

}
