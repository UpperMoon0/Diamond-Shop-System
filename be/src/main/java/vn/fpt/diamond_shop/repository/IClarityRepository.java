package vn.fpt.diamond_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.fpt.diamond_shop.constant.EClarity;
import vn.fpt.diamond_shop.model.entity.Clarity;

@Repository
public interface IClarityRepository extends JpaRepository<Clarity, Long> {
    Clarity findByClarity(EClarity clarityValue);
}