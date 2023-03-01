import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { Empleado } from './models/Empleado.model';
import { ServicioService } from './services/servicio.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    empleados: Empleado[] = [];

    constructor(
        private modalService: NgbModal,
        private servicio: ServicioService,
    ) {
        this.servicio.getDataConfig();
    }

    ngOnInit(): void {
        this.servicio.getEmpleados().subscribe(res => this.empleados = res);
    }  

    abrirModal(modal: Empleado): void {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.empleado = modal;
        // this.modalService.open("modal_"+modal.id);
    }
    

}
