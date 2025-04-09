import { NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';
import { ProductService } from '../service/product.service';
import { CreateProductDtoBuilder } from './builder/create-product-dto.builder';
import { ProductDtoBuilder } from './builder/product-dto.builder';
import { ProductBuilder } from './builder/product.builder';

describe('ProductService', () => {
  let service: ProductService;
  let repository: jest.Mocked<Repository<Product>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn(),
            findOneOrFail: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            on: jest.fn(),
            once: jest.fn(),
            removeListener: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const product: Product = new ProductBuilder().build();
  const productDto: ProductDto = new ProductDtoBuilder().build();

  describe('create', () => {
    const createProductDto: CreateProductDto =
      new CreateProductDtoBuilder().build();

    it('should create a product and return a product', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(product);
      jest.spyOn(repository, 'save').mockResolvedValue(product);
      jest.spyOn(service, 'getOne').mockResolvedValue(productDto);

      const response = await service.create(createProductDto);

      expect(response).toMatchObject(productDto);
      expect(response).toStrictEqual(productDto);

      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(product);
      expect(service.getOne).toHaveBeenCalledWith(product.id);
    });

    it('should throw an error if save fails', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(product);
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.create(createProductDto)).rejects.toThrow(
        'Database error',
      );
    });

    it('should throw a NotFoundException if product is not found in getOne', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(product);
      jest.spyOn(repository, 'save').mockResolvedValue(product);
      jest.spyOn(service, 'getOne').mockRejectedValue(new NotFoundException());

      await expect(service.create(createProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAll', () => {
    const products: Product[] = [product, product];
    const productDtos: ProductDto[] = [productDto, productDto];

    it('should return a list of products', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(products);

      const response = await service.getAll();

      expect(response).toMatchObject(productDtos);
      expect(response).toStrictEqual(productDtos);

      expect(repository.find).toHaveBeenCalled();
    });

    it('should return an empty array if no products exist', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const response = await service.getAll();

      expect(response).toMatchObject([]);
      expect(response).toStrictEqual([]);

      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single product', async () => {
      jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(product);

      const response = await service.getOne(product.id);

      expect(response).toMatchObject(productDto);
      expect(response).toStrictEqual(productDto);

      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: product.id },
        relations: ['customizations'],
      });
    }, 6000);

    it('should throw a NotFoundException if product is not found', async () => {
      jest
        .spyOn(repository, 'findOneOrFail')
        .mockRejectedValue(new NotFoundException());

      await expect(service.getOne('-')).rejects.toThrow(NotFoundException);

      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '-' },
        relations: ['customizations'],
      });
    });
  });
});
