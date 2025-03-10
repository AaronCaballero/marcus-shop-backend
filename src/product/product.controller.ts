import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductCustomizationDto } from './dto/create-product-customization.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCustomizationDto } from './dto/product-customization.dto';
import { ProductDto } from './dto/product.dto';
import { ProductCustomizationService } from './service/product-customization.service';
import { ProductService } from './service/product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly customizationService: ProductCustomizationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return this.service.create(createProductDto);
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
    return this.service.getAll();
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
    return this.service.getOne(id);
  }

  /** Customization */

  @Post(':productId/customization')
  @ApiOperation({ summary: 'Create a new product customization' })
  @ApiResponse({
    status: 201,
    description: 'The product customization has been successfully created.',
    type: ProductCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createCustomization(
    @Param('productId') productId: string,
    @Body() createProductCustomizationDto: CreateProductCustomizationDto,
  ): Promise<ProductCustomizationDto> {
    return this.customizationService.create(
      productId,
      createProductCustomizationDto,
    );
  }
}
