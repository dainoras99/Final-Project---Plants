package com.viko.plants.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="cart_session")
@Getter
@Setter
@NoArgsConstructor
public class CartSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "total_price")
    private Float total_price;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference(value="userCartSession")
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cartSession")
    @OrderBy
    private Set<CartItem> cartItems;

}
