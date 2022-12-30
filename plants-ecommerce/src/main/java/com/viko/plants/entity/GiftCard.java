package com.viko.plants.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="gift_cards")
@Getter
@Setter
@NoArgsConstructor
public class GiftCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "code")
    private String code;

    @Column(name = "sum")
    private Float sum;

    @Column(name = "remaining_balance")
    private Float remainingBalance;

    @Column(name = "used_balance")
    private Float usedBalance;
}
