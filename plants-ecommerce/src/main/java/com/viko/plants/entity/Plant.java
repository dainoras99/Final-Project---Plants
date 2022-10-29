package com.viko.plants.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="plants")
@Data
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "plants_category_id", nullable = false)
    private PlantCategory category;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Float price;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "in_stock")
    private Integer inStock;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "plant")
    @JsonManagedReference
    private Set<CartItem> cartItems;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "plant")
    @JsonManagedReference
    private Set<OrderItem> orderItems;

}
