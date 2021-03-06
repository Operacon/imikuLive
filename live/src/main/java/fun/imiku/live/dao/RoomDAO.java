/*
 * Copyright (C) 2022 Operacon.
 *
 * Use of this source code is governed by the GNU AGPLv3 license that can be found through the following link.
 *
 * https://github.com/Operacon/imikuLive/blob/main/LICENSE
 */
package fun.imiku.live.dao;


import fun.imiku.live.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomDAO extends JpaRepository<Room, Integer> {
    List<Room> findById(int id);

    List<Room> findByName(String name);

    @Query(nativeQuery = true, value = "SELECT * FROM room WHERE open=1")
    List<Room> getAllOpenRooms();

    Page<Room> findByOpen(int open, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM room WHERE name LIKE %:key% OR intro LIKE %:key%")
    Page<Room> searchByKeyword(@Param("key") String keyword, Pageable pageable);
}
