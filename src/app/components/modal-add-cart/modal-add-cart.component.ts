import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PagesService } from 'src/app/pages/pages.service';

@Component({
  selector: 'app-modal-add-cart',
  templateUrl: './modal-add-cart.component.html',
  styleUrls: ['./modal-add-cart.component.scss']
})
export class ModalAddCartComponent implements OnInit {

  selectedProduct: any;
  constructor(
    private bsModalRef: BsModalRef,
    private pagesService: PagesService,
    ) { }

  ngOnInit(): void {
    this.selectedProduct.qty = 1;
    this.calcTotalPrice();
    console.log(this.selectedProduct)
  }

  close() {
    this.bsModalRef.hide();
  }

  calcTotalPrice(){
    this.selectedProduct.amount = this.selectedProduct.price * this.selectedProduct.qty;
  }

  confirmOrder(){
    this.pagesService.listProducts.push(this.selectedProduct);
    sessionStorage.setItem('selected', JSON.stringify(this.pagesService.listProducts));
    this.close();
  }
}
