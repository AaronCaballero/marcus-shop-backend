import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductCustomizationDto } from './dto/create-product-customization.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProhibitedCustomizationDto } from './dto/create-prohibited-customization.dto';
import { ProductCustomizationDto } from './dto/product-customization.dto';
import { ProductDto } from './dto/product.dto';
import { ProhibitedCustomizationDto } from './dto/prohibited-customization.dto';
import { UpdateProductCustomizationDto } from './dto/update-product-customization.dto';
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
  @ApiOperation({ summary: 'Get all existing product customizations' })
  @ApiResponse({
    status: 200,
    description: 'The product customizations has been successfully gotten.',
    type: ProductCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getAllCustomizations(): Promise<ProductCustomizationDto[]> {
    return this.customizationService.getAll();
  }

  @Get('customization/grouped')
  @ApiOperation({
    summary: 'Get all existing product customizations grouped by type',
  })
  @ApiResponse({
    status: 200,
    description: 'The product customizations has been successfully gotten.',
    type: ProductCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getGroupedCustomizations(): Promise<
    { [key: string]: ProductCustomizationDto[] } | {}
  > {
    return this.customizationService.getGroupedCustomizations();
  }

  @Patch('customization/:customizationId')
  @ApiOperation({
    summary: 'Update product customization',
  })
  @ApiResponse({
    status: 200,
    description: 'The product customization has been successfully updated.',
    type: ProductCustomizationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Product customization not found.' })
  updateCustomization(
    @Param('customizationId') customizationId: string,
    @Body() updateCustomizationDto: UpdateProductCustomizationDto,
  ): Promise<ProductCustomizationDto> {
    return this.customizationService.updateCustomization(
      customizationId,
      updateCustomizationDto,
    );
  }

  @Get('customization/:category')
  @ApiOperation({
    summary: 'Get all existing product customizations by category',
  })
  @ApiResponse({
    status: 200,
    description: 'The product customizations has been successfully gotten.',
    type: ProductDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getCustomizationsByCategory(
    @Param('category') category: ProductCategory,
  ): Promise<ProductCustomizationDto[]> {
    return this.customizationService.getAllByCategory(category);
  }

  //TODO: create by productId
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'The product has been deleted.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
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
