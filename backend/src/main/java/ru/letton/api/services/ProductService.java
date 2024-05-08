package ru.letton.api.services;

import org.springframework.stereotype.Service;
import ru.letton.api.models.Product;
import ru.letton.api.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository productRepository;


    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(UUID uuid) {
        Optional<Product> product = productRepository.findById(uuid);
        return product.orElse(null);
    }
}
