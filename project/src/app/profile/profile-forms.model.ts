export class Iuser{
    constructor(
        public username:string,
        public firstname:string,
        public lastname:string,
        public email:string,
        public password:string,
        public fulltime: boolean,
        public gender: string,
        public codelang: string,
        public type: string,
        public role:string,
        public mobile: string,
        public  work: string,
        public _id?: string
    ){}
}
