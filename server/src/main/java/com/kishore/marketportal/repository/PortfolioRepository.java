package com.kishore.marketportal.repository;

import com.kishore.marketportal.model.PortfolioItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PortfolioRepository extends MongoRepository<PortfolioItem, String> {
    List<PortfolioItem> findByUserEmail(String userEmail);
}
