import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductController } from '../product.controller';
import { ProductCustomizationService } from '../service/product-customization.service';
import { ProductService } from '../service/product.service';
import { ProhibitedCustomizationService } from '../service/prohibited-customization.service';
import { CreateProductDtoBuilder } from './builder/create-product-dto.builder';
import { ProductDtoBuilder } from './builder/product-dto.builder';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            getOne: jest.fn(),
          },
        },
        {
          provide: ProductCustomizationService,
          useValue: {},
        },
        {
          provide: ProhibitedCustomizationService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const productDto: ProductDto = new ProductDtoBuilder().build();

  describe('create', () => {
    const createProductDto: CreateProductDto =
      new CreateProductDtoBuilder().build();

    it('should create and return a product', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(productDto);

      const response = await controller.create(createProductDto);

      expect(response).toMatchObject(productDto);
      expect(response).toStrictEqual(productDto);

      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('getAll', () => {
    const productDtos: ProductDto[] = [productDto, productDto];

    it('should return an array of products', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue(productDtos);

      const response = await controller.getAll();

      expect(response).toMatchObject(productDtos);
      expect(response).toStrictEqual(productDtos);

      expect(service.getAll).toHaveBeenCalled();
    });

    it('should return an empty array if no products exist', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue([]);

      const response = await controller.getAll();

      expect(response).toMatchObject([]);
      expect(response).toStrictEqual([]);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single product', async () => {
      jest.spyOn(service, 'getOne').mockResolvedValue(productDto);

      const response = await controller.getOne(productDto.id);

      expect(response).toMatchObject(productDto);
      expect(response).toStrictEqual(productDto);

      expect(service.getOne).toHaveBeenCalledWith(productDto.id);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(service, 'getOne').mockRejectedValue(new NotFoundException());

      await expect(controller.getOne('-')).rejects.toThrow(NotFoundException);

      expect(service.getOne).toHaveBeenCalledWith('-');
    });
  });
});
