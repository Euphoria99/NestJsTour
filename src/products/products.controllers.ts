import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  //we are telling nestjs what we need
  //we need instance of ProductService , so we define it like this so that we can use ProductService Class as a type
  constructor(private productService: ProductsService) {}

  //Post req
  @Post()
  addProduct(
    //defining individually
    // @Body('title') prodTitle: string,
    // @Body('desc') prodDesc: string,
    // @Body('price') prodPrice: string,
    //this is how we send ever
    @Body()
    completeBody: {
      title: string;
      description: string;
      price: number;
    },
  ): any {
    //see how we get insertProduct method from  'ProductService' via productService property.
    const generatedId = this.productService.insertProduct(
      completeBody.title,
      completeBody.description,
      completeBody.price,
    );
    console.log(
      '🚀 ~ file: products.controllers.ts:31 ~ ProductController ~ generatedId',
      generatedId,
    );
    return { id: generatedId };
  }

  //Get
  @Get()
  getAllProducts() {
    //automatically converted to  json because lists are treated same as objects
    return this.productService.getProducts();
  }
  //Get by ID
  @Get(':id')
  //using param to get value in the path as an id parameter
  getProducts(@Param('id') id: string) {
    //automatically converted to  json because lists are treated same as objects
    return this.productService.getSingleProducts(id);
  }

  //Patch
  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    @Body()
    completeBody: {
      title: string;
      description: string;
      price: number;
    },
  ) {
    this.productService.updateProduct(
      id,
      completeBody.title,
      completeBody.description,
      completeBody.price,
    );
    return null;
    //can do this way too
    // const qd = this.productService.updateProduct(
    //   id,
    //   completeBody.title,
    //   completeBody.description,
    //   completeBody.price,
    // );
    // return qd;
  }

  //delete
  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productService.deleteProduct(id);
    return null;
  }
}
