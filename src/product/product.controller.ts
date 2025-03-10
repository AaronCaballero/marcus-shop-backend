import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all existing products' })
  @ApiResponse({
    status: 200,
    description: 'The products has been successfully gotten.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getAll(): Promise<ProductDto[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an existing product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully gotten.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.getOne(id);
  }
}
