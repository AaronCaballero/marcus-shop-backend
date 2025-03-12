import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductCustomizationDto } from './dto/create-product-customization.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProhibitedCustomizationDto } from './dto/create-prohibited-customization.dto';
import { ProductCustomizationDto } from './dto/product-customization.dto';
import { ProductDto } from './dto/product.dto';
import { ProhibitedCustomizationDto } from './dto/prohibited-customization.dto';
import { ProductCategory } from './enum/product.enum';
import { ProductCustomizationService } from './service/product-customization.service';
import { ProductService } from './service/product.service';
import { ProhibitedCustomizationService } from './service/prohibited-customization.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly customizationService: ProductCustomizationService,
    private readonly prohibitedCustomizationService: ProhibitedCustomizationService,
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

  @Post('customization')
  @ApiOperation({ summary: 'Create a new product customization' })
  @ApiResponse({
    status: 201,
    description: 'The product customization has been successfully created.',
    type: ProductCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createCustomization(
    @Body() createProductCustomizationDto: CreateProductCustomizationDto,
  ): Promise<ProductCustomizationDto> {
    return this.customizationService.create(createProductCustomizationDto);
  }

  @Get('customization')
  @ApiOperation({ summary: 'Get all existing products' })
  @ApiResponse({
    status: 200,
    description: 'The products has been successfully gotten.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getAllCustomizations(): Promise<ProductCustomizationDto[]> {
    return this.customizationService.getAll();
  }

  @Get('customization/:category')
  @ApiOperation({ summary: 'Get all existing products' })
  @ApiResponse({
    status: 200,
    description: 'The products has been successfully gotten.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getCustomizationsByCategory(
    @Param('category') category: ProductCategory,
  ): Promise<ProductCustomizationDto[]> {
    return this.customizationService.getAllByCategory(category);
  }

  @Post('prohibited-customization')
  @ApiOperation({ summary: 'Create a new prohibited customization' })
  @ApiResponse({
    status: 201,
    description: 'The prohibited customization has been successfully created.',
    type: ProductCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createProhibitedCustomization(
    @Body() createProhibitedCustomization: CreateProhibitedCustomizationDto,
  ): Promise<any> {
    return this.prohibitedCustomizationService.create(
      createProhibitedCustomization,
    );
  }

  @Get('prohibited-customization')
  @ApiOperation({ summary: 'Get all existing prohibited customizations' })
  @ApiResponse({
    status: 200,
    description: 'The prohibited customizations has been successfully gotten.',
    type: ProhibitedCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getAllProhibitedCustomizations(): Promise<ProhibitedCustomizationDto[]> {
    return this.prohibitedCustomizationService.getAll();
  }

  @Get('prohibited-customization-by-ids')
  @ApiOperation({
    summary: 'Get all existing prohibited customizations by customization ids',
  })
  @ApiResponse({
    status: 200,
    description: 'The prohibited customizations has been successfully gotten.',
    type: ProhibitedCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getAllProhibitedCustomizationsByIds(
    @Query() query?: CreateProhibitedCustomizationDto,
  ): Promise<ProhibitedCustomizationDto[]> {
    return this.prohibitedCustomizationService.getByCustomizationIds(
      query?.ids,
    );
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

  @Get(':productId/prohibited-customization')
  @ApiOperation({ summary: 'Get prohibited customizations by product' })
  @ApiResponse({
    status: 200,
    description: 'The prohibited customizations has been successfully gotten.',
    type: ProhibitedCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getProhibitedCustomizationsByProduct(
    @Param('productId') productId: string,
  ): Promise<ProhibitedCustomizationDto[]> {
    return this.prohibitedCustomizationService.getAllByProduct(productId);
  }
}
