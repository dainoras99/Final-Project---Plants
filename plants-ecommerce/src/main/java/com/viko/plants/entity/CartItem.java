package com.viko.plants.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="cart_item")
@Getter
@Setter
@NoArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "plants_id", nullable = false)
   // @JsonBackReference
    @JsonIgnore
    private Plant plant;

    @ManyToOne
    @JoinColumn(name = "plants_plants_category_id", nullable = false)
   // @JsonBackReference
    @JsonIgnore
    private PlantCategory plantCategory;

    @ManyToOne
    @JoinColumn(name="cart_session_id", nullable = false)
    //@JsonBackReference
    @JsonIgnore
    private CartSession cartSession;

    @ManyToOne
    @JoinColumn(name="cart_session_user_id", nullable = false)
   // @JsonBackReference
    @JsonIgnore
    private User user;
}
