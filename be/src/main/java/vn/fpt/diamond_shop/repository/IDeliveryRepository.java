package vn.fpt.diamond_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.fpt.diamond_shop.model.entity.Delivery;

import java.util.List;

@Repository
public interface IDeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findAllByDelivererId(Long id);
}
