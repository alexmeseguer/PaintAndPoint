import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from '../models/Empleado.model';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input() empleado?: Empleado;

    constructor(
        private servicio: ServicioService,
    ) {
    }

    ngOnInit(): void {
        console.log('modal',this.empleado);
        if(this.empleado){
            this.empleado.sex_name = this.servicio.getSexName(this.empleado.sex);
            this.empleado.country_name = this.servicio.getCountryName(this.empleado.countryid);
            console.log(this.servicio.getCountryName(this.empleado.countryid));
        }
    }  

    closeModal(){
        // modal.dismiss('Cross click')
    }

}
