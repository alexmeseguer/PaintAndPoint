import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
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
    copiaEmpleados: Empleado[] = [];
    searchControl = new UntypedFormControl('');
    loading: boolean = true;

    constructor(
        private modalService: NgbModal,
        private servicio: ServicioService,
    ) {
        this.servicio.getDataConfig();
    }

    ngOnInit(): void {
        this.servicio.getEmpleados().subscribe(res => {
            res.forEach(emp => {
                this.empleados.push({
                    sex_name: this.servicio.getSexName(emp.sex) || '',
                    country_name: this.servicio.getCountryName(emp.countryid) || '',
                    ...emp
                });
            });
            this.copiaEmpleados = this.empleados;
            this.loading = false;
        });
        this.activeSearchControl();
    }

    abrirModal(modal: Empleado): void {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.empleado = modal;
    }

    activeSearchControl() {
        this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe(
            (data: string) => {
                this.loading = true;
                this.empleados = this.buscador(data);
                console.log(data);
                this.loading = false;
            },
            (error) => {
                console.log(error);
                this.loading = false;
            }
        );
    }

    buscador(value: string): Empleado[] {
        let output: Empleado[] = [];
        this.copiaEmpleados.filter((emp: Empleado) =>{
            for (const key in emp) {
                if (Object.prototype.hasOwnProperty.call(emp, key)) {
                    let element = emp[key];
                    if(typeof element === 'string'){
                        let minus = element.trim().toLowerCase();
                        if(minus.search(value.trim().toLowerCase()) > -1){
                            output.push(emp);
                            break;
                        } 
                    }
                }
            }
        });
        return output;
    }



}
