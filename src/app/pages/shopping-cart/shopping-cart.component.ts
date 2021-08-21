import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesService } from '../pages.service';
import { country } from 'src/app/common/const';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  listProducts: any[] = [];
  infoUser!: FormGroup;
  enableEdit: boolean = false;
  submitted: boolean = false;
  totalObj = {
    sub_total: 0,
    total_qty: 0
  }
  defaultCountry: any = 'VN';
  countries: any[] = [];
  infoCart: any;
  constructor(
    private fb: FormBuilder,
    private pageService: PagesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.infoUser = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      email: [''],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: [''],
      note: ['']
    });
    this.countries = country;
    this.getListProducts();
  }

  // convenience getter for easy access to form fields
  get f() { return this.infoUser.controls; }

  /**
   * Get data products
   */
  getListProducts(){
    this.spinner.show();
    const cart = sessionStorage.getItem('selected')
    this.listProducts = JSON.parse(cart!);
    setTimeout(() => {
      this.calcObj();
      this.spinner.hide();
    })
  }

  calcObj() {
    if(this.listProducts){
      this.totalObj.sub_total = this.listProducts.reduce((sum, current) => sum + current.amount, 0);
      this.totalObj.total_qty = this.listProducts.reduce((sum, current) => sum + (current.qty ? current.qty : 0), 0);
    }
  }

  /**
   * Update quantity
   * @param id
   */
  updateProduct(id: string){
    this.listProducts.forEach(
      product => {
        if(product.id === id) {
          product.amount = product.qty * product.price;
        }
      }
    )
    this.calcObj();
  }

  /**
   * Save list product
   */
  onSaveEdit() {
    this.handleSaveData();
    this.enableEdit = false;
  }

  handleSaveData(){
    this.calcObj();
    this.pageService.listProducts = this.listProducts;
    sessionStorage.setItem('selected', JSON.stringify(this.listProducts));
  }

  /**
   * Remove product
   */
  removeProduct(item: any){
    const index = this.listProducts.indexOf(item, 0);
    if(index > -1){
      this.listProducts.splice(index, 1);
      this.handleSaveData();
    }
  }
}
