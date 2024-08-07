package vn.fpt.diamond_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.fpt.diamond_shop.model.entity.DiamondColor;

import java.util.Optional;

@Repository
public interface IDiamondColorRepository extends JpaRepository<DiamondColor, Long> {
    Optional<DiamondColor> findByColor(String color);
}