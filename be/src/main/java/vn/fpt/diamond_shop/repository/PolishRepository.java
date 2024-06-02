package vn.fpt.diamond_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.fpt.diamond_shop.constant.EPolish;
import vn.fpt.diamond_shop.entity.Polish;

import java.util.UUID;

@Repository
public interface PolishRepository extends JpaRepository<Polish, Long> {
    Polish findByPolish(EPolish polishValue);
}