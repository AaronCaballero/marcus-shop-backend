import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProhibitedCustomizationAdapter } from '../adapter/prohibited-customization.adapter';
import { CreateProhibitedCustomizationDto } from '../dto/create-prohibited-customization.dto';
import { ProductCustomizationDto } from '../dto/product-customization.dto';
import { ProhibitedCustomizationDto } from '../dto/prohibited-customization.dto';
import { ProhibitedCustomization } from '../entity/prohibited-customization.entity';
import { ProductCustomizationService } from './product-customization.service';

@Injectable()
export class ProhibitedCustomizationService {
  constructor(
    @InjectRepository(ProhibitedCustomization)
    private readonly repository: Repository<ProhibitedCustomization>,
    private readonly customizationService: ProductCustomizationService,
  ) {}

  async create(
    customizationIds: CreateProhibitedCustomizationDto,
  ): Promise<ProhibitedCustomizationDto> {
    const customizations: ProductCustomizationDto[] =
      await this.customizationService.getAllByIds(customizationIds);

    if (customizations.length !== customizationIds.ids.length) {
      throw new NotFoundException('Some customizations not found');
    }

    const prohibitedCustomization = await this.repository.save(
      this.repository.create({
        customizations,
      }),
    );

    return this.getOne(prohibitedCustomization.id);
  }

  async getAll(): Promise<ProhibitedCustomizationDto[]> {
    return ProhibitedCustomizationAdapter.toDtos(
      await this.repository.find({
        relations: ['customizations'],
      }),
    );
  }

  async getByCustomizationIds(
    customizationIds?: string[],
  ): Promise<ProhibitedCustomizationDto[]> {
    if (!customizationIds)
      throw new BadRequestException('Bad request, no ids provided');

    return ProhibitedCustomizationAdapter.toDtos(
      await this.repository.find({
        relations: ['customizations'],
        where: {
          customizations: {
            id: In(customizationIds),
          },
        },
      }),
      true,
    );
  }

  async getAllByProduct(
    productId: string,
  ): Promise<ProhibitedCustomizationDto[]> {
    return ProhibitedCustomizationAdapter.toDtos(
      await this.repository.find({
        relations: ['customizations', 'products'],
        where: {
          products: {
            id: productId,
          },
        },
      }),
    );
  }

  async getOne(id: string): Promise<ProhibitedCustomizationDto> {
    return ProhibitedCustomizationAdapter.toDto(
      await this.repository.findOneOrFail({
        where: {
          id,
        },
        relations: ['customizations'],
      }),
      true,
    );
  }
}
