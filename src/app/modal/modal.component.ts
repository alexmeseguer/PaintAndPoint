import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from '../models/Empleado.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input() empleado?: Empleado;

    constructor(
        private modalService: NgbModal,
    ) {}

    ngOnInit(): void {
    }  

    closeModal(){
        this.modalService.dismissAll();
    }

}
