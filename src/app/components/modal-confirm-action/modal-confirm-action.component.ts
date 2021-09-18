import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirm-action',
  templateUrl: './modal-confirm-action.component.html',
  styleUrls: ['./modal-confirm-action.component.scss']
})
export class ModalConfirmActionComponent implements OnInit {
  result: Subject<any> = new Subject<any>();
  title: any;
  message: any;
  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

  confirm(){
    this.result.next(true);
    this.close();
  }
}
