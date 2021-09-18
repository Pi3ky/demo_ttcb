import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesService } from '../pages.service';
import { country } from 'src/app/common/const';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmActionComponent } from 'src/app/components/modal-confirm-action/modal-confirm-action.component';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/common/type';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  infoUser!: FormGroup;
  enableEdit: boolean = false;
  submitted: boolean = false;
  totalObj = {
    sub_total: 0,
    total_qty: 0
  }
  requestParams = {
    customer: {
      name: '',
      city: '',
      country: 'VN',
      email: '',
      phone: '',
      state: '',
      zipcode: '',
      street: '',
      note: '',
    },
    bag: []
  }
  currentUser: User;
  countries: any[] = [];
  infoCart: any;
  constructor(
    private fb: FormBuilder,
    private pageService: PagesService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    public authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.infoUser = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', Validators.required],
      email: [''],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: [''],
      note: ['']
    });
    this.authService.currentUser.subscribe(
      user => {
        if(user) {
          this.currentUser = user.user;
          Object.keys(this.requestParams.customer).map(key => {
            if(user.user[key]){
              this.requestParams.customer[key] = user.user[key]
            }
          })
        }
      }
    )
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
    this.pageService.getShoppingCart().subscribe(
      res => {
        this.requestParams.bag = res;
        this.calcObj();
        this.spinner.hide();
      },
      err => {
        console.error(err)
        this.spinner.hide();
      }
    )
  }

  /**
   * Calculate price and quantity
   */
  calcObj() {
    if(this.requestParams.bag){
      this.totalObj.sub_total = this.requestParams.bag.reduce((sum, current) => sum + current.amount, 0);
      this.totalObj.total_qty = this.requestParams.bag.reduce((sum, current) => sum + (current.qty ? current.qty : 0), 0);
    }
  }

  /**
   * Update quantity
   * @param id
   */
  updateProduct(id: string){
    this.requestParams.bag.forEach(
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

  /**
   * Save data edit
   */
  handleSaveData(){
    this.calcObj();
    sessionStorage.setItem('selected', JSON.stringify(this.requestParams.bag));
  }

  /**
   * Remove product
   */
  removeProduct(item: any){
    const bsModal = this.modalService.show(ModalConfirmActionComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: "Remove product",
        message: "Do you want to remove this product?"
      }
    })
    bsModal.content.result.subscribe(
      isConfirm => {
        if(isConfirm){
          const index = this.requestParams.bag.indexOf(item, 0);
          if(index > -1){
            this.requestParams.bag.splice(index, 1);
            this.handleSaveData();
          }
        }
      }
    )
  }

  /**
   * Handle submit form
   * @param formGroup
   */
  onSubmit(formGroup){
    if(this.validOrder(formGroup)){
      if(!this.requestParams.bag.length){
        this.alertService.error('You have not selected anything for your cart');
        return;
      }
      this.spinner.show();
      Object.keys(formGroup.value).map(key => {
        this.requestParams.customer[key] = formGroup.value[key]
      })
      this.pageService.createBooking(this.requestParams).subscribe(
        res => {
          this.alertService.success('Your order created!');
          sessionStorage.removeItem('selected');
          this.spinner.hide();
        },
        err => {
          console.error(err)
          this.alertService.error(err)
          this.spinner.hide();

        }
      )
    }
  }

  /**
   * Check valid form
   * @param formGroup
   * @returns
   */
  validOrder(formGroup) {
  let result = true;
  if (formGroup.invalid) {
    this.markFormGroupTouched(formGroup);
    result = false;
  }
    return result;
  }

  /**
  * Marks all controls in a form group as touched
  * @param formGroup - The form group to touch
  */
  private markFormGroupTouched(formGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
