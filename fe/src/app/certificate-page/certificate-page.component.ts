import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../service/account.service';
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-certificate-page',
  templateUrl: './certificate-page.component.html',
  styleUrls: ['./certificate-page.component.css']
})
export class CertificatePageComponent implements OnInit {
  protected diamond;
  // @ts-ignore
  constructor(private productService: ProductService,
              private toastrService: ToastrService,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSelectedTypes(1);

    const token = localStorage.getItem('accessToken');
    this.accountService.validateToken(token).subscribe({
      next: (res) => {
        if (res.message == "MANAGER") {
          this.router.navigate(["/manager"]).then(r=> {});
        }
        if (res.message == "DELIVERER") {
          this.router.navigate(["/delivery"]).then(r=> {});
        }
      }
    });
  }

  public getSelectedTypes(id: number): void {
    this.productService.getDiamond(id).subscribe({
      next: (diamond: any) => {
        this.diamond = diamond;
      },
      error: () => this.toastrService.error("Error fetching diamond"),
    });
  }
}