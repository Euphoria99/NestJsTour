export class Product {
  //classic old school method
  //   id: string;
  //   title: string;
  //   description: string;
  //   price: number;
  //   constructor(id: string, til: string, desc: string, amt: number) {
  //     this.id = id;
  //     this.title = til;
  //     this.description = desc;
  //     this.price = amt;
  //   }

  //simplified way in nest
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
