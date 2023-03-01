export class Empleado{
    id: number = 0;
    name: string = "";
    surname: string = "";
    surname2: string = "";
    sex: string = "";
    countryid: number = 0;
    phone: string = "";
    datebirthday: Date = new Date();
    lastModification: Date = new Date();
    country_name?: string = "";
    sex_name?: string = "";
}

export class Sex {
    id: number = 0;
    key: string = "";
    description: string = "";
}

export class Language {
    id: number = 0;
    key: string = "";
    description: string = "";
}

export class Country {
    id: number = 0;
    description: string = "";
    prefix: number = 0;
    language: string = "";
}