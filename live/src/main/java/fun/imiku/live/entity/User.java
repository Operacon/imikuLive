/*
 * Copyright (C) 2022 Operacon.
 *
 * Use of this source code is governed by the GNU AGPLv3 license that can be found through the following link.
 *
 * https://github.com/Operacon/imikuLive/blob/main/LICENSE
 */
package fun.imiku.live.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String nickname;
    private String password;
    @ColumnDefault("3")
    private int gender;
    @ColumnDefault("auto")
    private String avatar;
    @ColumnDefault("0")
    private int innerCode;
    private String intro;
    @ColumnDefault("未知")
    private String ip;
    @ColumnDefault("0")
    private int room;
}
