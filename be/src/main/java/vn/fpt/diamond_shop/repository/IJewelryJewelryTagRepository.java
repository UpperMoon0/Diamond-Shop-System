package vn.fpt.diamond_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.fpt.diamond_shop.model.entity.JewelryJewelryTag;

import java.util.List;

public interface IJewelryJewelryTagRepository extends JpaRepository<JewelryJewelryTag, Long> {
    @Query("SELECT j.jewelryTagId FROM JewelryJewelryTag j WHERE j.jewelryId = ?1")

    List<JewelryJewelryTag> findByJewelryTagId(Long id);
}