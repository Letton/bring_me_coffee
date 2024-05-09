package ru.letton.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.letton.api.models.Order;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findAllByUserId(UUID userId);
}
