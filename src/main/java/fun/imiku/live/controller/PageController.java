/*
 * Copyright (C) 2022 Operacon.
 *
 * Use of this source code is governed by the GNU AGPLv3 license that can be found through the following link.
 *
 * https://github.com/Operacon/imikuLive/blob/main/LICENSE
 */
package fun.imiku.live.controller;

import fun.imiku.live.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class PageController {
    @Autowired
    AccountService accountService;

    @RequestMapping("/login")
    public String loginPage(@RequestParam Map<String, Object> param, Model model) {
        if (param.containsKey("e")) model.addAttribute("email", param.get("e"));
        return "login";
    }

    @RequestMapping("/register")
    public String registerPage(@RequestParam Map<String, Object> param, Model model) {
        if (param.containsKey("e")) model.addAttribute("email", param.get("e"));
        return "register";
    }

    @RequestMapping("/resetpassword")
    public String resetPasswordPage(@RequestParam Map<String, Object> param, Model model) {
        model.addAttribute("email", param.get("e"));
        model.addAttribute("id", param.get("i"));
        return "reset";
    }

    @RequestMapping("/confirm")
    public String confirmPage(@RequestParam Map<String, Object> param, Model model) {
        if (accountService.confirm((String) param.get("e"), Integer.parseInt((String) param.get("i")))) {
            model.addAttribute("email", param.get("e"));
            return "confirm";
        } else {
            return "redirect:/error/400";
        }
    }

    @RequestMapping("/terms")
    public String termsPage() {
        return "terms";
    }
}
