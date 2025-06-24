package com.kishore.marketportal.controller;

import com.kishore.marketportal.model.PortfolioItem;
import com.kishore.marketportal.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

    @Autowired
    private PortfolioRepository portfolioRepo;

    @GetMapping("/{email}")
    public List<PortfolioItem> getPortfolio(@PathVariable String email) {
        return portfolioRepo.findByUserEmail(email);
    }

    @PostMapping("/add")
    public String addStock(@RequestBody PortfolioItem item) {
        System.out.println(
                "Received Stock: " + item.getSymbol() + " x " + item.getQuantity() + " for " + item.getUserEmail());
        portfolioRepo.save(item);
        return "Stock added to portfolio";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStock(@PathVariable String id) {
        portfolioRepo.deleteById(id);
        return "Stock deleted";
    }
}
