package vn.fpt.diamond_shop.model.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "jewelry_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Jewelry jewelry;

    @ManyToOne
    @JoinColumn(name = "size_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private JewelrySize size;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "create_at")
    private LocalDateTime createAt;
}
