import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  //if you add private key, products array is only accessible to ProductsService and its methods
  products: Product[] = [];

  //'insert product' method with following inputs to insert products
  insertProduct(title: string, description: string, price: number) {
    //temporarily  we are restorting to this way of generating id, use packages that generate id.
    const id = Math.random().toString(36).slice(2);
    //telling what parameters Product takes
    const newProduct = new Product(id, title, description, price);
    //newProducts will pushed to products array..thats  how 'products' will have many newProducts
    this.products.push(newProduct);
    return id;
  }

  //method to get products
  getProducts() {
    return [...this.products];
  }

  //finding products by id is used in multiple places..hence we are defining private function so that we can use it wherever needed.
  private findProduct(id: string): [Product, number] {
    //function to find the function inside the array
    const productIndex = this.products.findIndex((prod) => prod.id === id);

    const product = this.products[productIndex];
    if (!product) {
      //using nestjs exception filter
      throw new NotFoundException('Could not find the product');
    }
    return [product, productIndex];
  }

  //method to get individual products by id
  //see how we are passing  id: string from the controller here to get the single prod
  getSingleProducts(id: string) {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  //method to update products
  updateProduct(id: string, title, description, price) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    //users may update any one of the value and key others empty..we dont want to update other values with null.
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(id: string) {
    const [Product, index] = this.findProduct(id);
    this.products.splice(index, 1);
    return null;
  }
}
