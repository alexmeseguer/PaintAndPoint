import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country, Empleado, Language, Sex } from '../models/Empleado.model';

const URL_DATA = 'https://storage.googleapis.com/web-aktios/entrevista-tecnica/datasource.json';
const URL_EMPLEADOS = 'https://storage.googleapis.com/web-aktios/entrevista-tecnica/info-population.json';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

    sex: Sex[] = [];
    languages: Language[] = [];
    countries: Country[] = [];
    
    constructor(
        private http: HttpClient
    ) {
    }

    getEmpleados(): Observable<Empleado[]> {
        return this.http.get<Empleado[]>(URL_EMPLEADOS).pipe(map((res: any) => {
            let output: Empleado[] = [];
            if (res.population?.person){
                // output = res.population.person;
                if(res.population.person){
                    res.population.person.forEach((emp: any) => {
                        output.push({
                            countryid: emp['country-id'] || 0,
                            ...emp});
                    });

                }
            }
            return output;
        }));
    }
    
    getDataConfig() {
        this.http.get(URL_DATA).subscribe((res: any) => {
            console.log('3',res);
            if( res && res.data){
                this.sex = res.data.sex || [];
                this.languages = res.data.language || [];
                this.countries = res.data.country || [];
            }
        });
    }

    getSexName(sex: string): string{
        return  this.sex.find( (element: Sex) => element.key === sex)?.description || '';
    }

    getCountryName(countryId: number): string{
        let output =  this.countries.find( (element: Country) => {
            element.id === countryId;
            console.log(element);
        } );
            
        console.log(output);
        return  this.countries.find( (element: Country) => element.id === countryId)?.description || '';
    }
}
