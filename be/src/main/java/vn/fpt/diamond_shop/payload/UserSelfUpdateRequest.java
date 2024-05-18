package vn.fpt.diamond_shop.payload;

import lombok.Getter;
import javax.validation.constraints.Email;

@Getter
public class UserSelfUpdateRequest {
    private String name;

    @Email
    private String email;

    private String imageUrl;
}
