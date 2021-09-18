import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Products } from 'src/app/common/type';
import { PagesService } from '../pages.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { ModalViewProductComponent } from 'src/app/components/modal-view-product/modal-view-product.component';
import { ModalAddCartComponent } from 'src/app/components/modal-add-cart/modal-add-cart.component';
import { AlertService } from 'src/app/_services/alert.service';

const ALL_PRODUCT = 'All product';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss']
})
export class HomePagesComponent implements OnInit {
  banners = [
    { id: 'banner-2', image: './assets/images/banner/fashion-banner2.jpg' },
    { id: 'banner-4', image: './assets/images/banner/fashion-banner4.jpg' },
    { id: 'banner-1', image: './assets/images/banner/fashion-banner1.jpg' },
  ]
  products: Products[] = [];
  categories: string[] = [];
  selectedTag: string = '';
  constructor(
    private pageService: PagesService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.selectedTag = ALL_PRODUCT;
    this.getProduct();
    this.getListCategory();
  }

  /**
   * Fetch data product
   */
  getProduct(){
    this.spinner.show();
    this.pageService.getProducts().subscribe(
      res => {
        this.products = res;
        this.spinner.hide();
      },
      err => {
        console.error(err)

        this.spinner.hide();
      }
    )
  }

  /**
   * Get list category
   * @returns
   */
  getListCategory(){
    this.pageService.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        console.error(err);
      }
    )
  }

  /**
   * Select product to handle
   * @param product
   */
  selectProduct(product: any){
    const _bsModalRef = this.modalService.show(ModalViewProductComponent, {
      class: "modal-lg modal-dialog-centered",
      initialState: {
        product: product,
      }
    })
    _bsModalRef.content.result.subscribe(
      result => {
        if(result){
          if (result.buy) {
            this.modalService.show(ModalAddCartComponent, {
              class: "modal-lg modal-dialog-centered",
              initialState: {
                selectedProduct: result.product,
              }
            })
          } else {
            this.getProductByTag(result.product.category);
          }
        }
      }
    )
  }

  getProductByTag(tag: string){
    if(tag){
      this.selectedTag = tag;
      this.spinner.show();
      const param = {
        category: tag
      }
      this.pageService.filterCategory(param).subscribe(
        res => {
          this.products = res;
          this.spinner.hide();
        },
        err => {
          console.error(err)
          this.spinner.hide();
        }
      )
    } else {
      this.getProduct();
      this.selectedTag = ALL_PRODUCT;
    }
  }

}
