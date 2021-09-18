import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-view-product',
  templateUrl: './modal-view-product.component.html',
  styleUrls: ['./modal-view-product.component.scss']
})
export class ModalViewProductComponent implements OnInit {
  product: any;
  result: Subject<any> = new Subject<any>();
  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.bsModalRef.hide();
  }

  buyProduct() {
    this.result.next({product: this.product, buy: true});
    this.close();
  }

  filterByTag() {
    this.result.next({product: this.product, buy: false});
    this.close();
  }

}
