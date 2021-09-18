import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/_services/alert.service';
import { ModalConfirmActionComponent } from '../modal-confirm-action/modal-confirm-action.component';

@Component({
  selector: 'app-modal-add-cart',
  templateUrl: './modal-add-cart.component.html',
  styleUrls: ['./modal-add-cart.component.scss']
})
export class ModalAddCartComponent implements OnInit {

  cartProducts: any;
  selectedProduct: any;
  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.cartProducts = JSON.parse(sessionStorage.getItem('selected'));
    if(!this.cartProducts) this.cartProducts = [];
    this.selectedProduct.qty = 1;
    this.calcTotalPrice();
  }

  close() {
    this.bsModalRef.hide();
  }

  calcTotalPrice(){
    this.selectedProduct.amount = this.selectedProduct.price * this.selectedProduct.qty;
  }

  confirmOrder(){
    const existed = this.cartProducts.find(p => p.id === this.selectedProduct.id)
    if(existed) {
      const bs4Modal = this.modalService.show(ModalConfirmActionComponent, {
        class: "modal-md modal-dialog-centered",
        initialState: {
          title: "Confirm select product",
          message: "This product was selected. You sure about this change?"
        }
      })
      bs4Modal.content.result.subscribe(
        isConfirm => {
          if(isConfirm){
            this.cartProducts.forEach(product => {
              if(product.id === this.selectedProduct.id){
                product.qty = this.selectedProduct.qty;
              }
            })
            sessionStorage.setItem('selected', JSON.stringify(this.cartProducts));
            this.alertService.success('The product is added');
            setTimeout(() => {
              this.close();
            }, 0);
          } else {
            this.close();
          }
        }
      )

    } else {
      this.cartProducts.push(this.selectedProduct);
      this.alertService.success('The product is added');
      sessionStorage.setItem('selected', JSON.stringify(this.cartProducts));
      this.close();
    }


  }
}
