package vn.fpt.diamond_shop.controller;

import org.springframework.http.ResponseEntity;
import vn.fpt.diamond_shop.dto.CommonResponse;
import vn.fpt.diamond_shop.dto.LoginRequest;
import vn.fpt.diamond_shop.dto.LoginResponse;
import vn.fpt.diamond_shop.dto.RegisterRequest;
import vn.fpt.diamond_shop.security.exception.BadRequestException;

import javax.validation.Valid;


public interface IAuthController {
    ResponseEntity<CommonResponse> register(@Valid RegisterRequest signUpRequest) throws BadRequestException;
    ResponseEntity<LoginResponse> login(LoginRequest loginRequest);
}
