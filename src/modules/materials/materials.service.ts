import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateMaterialDto) {
    const exists = await this.exists(data.id);
    if (exists) throw new BadRequestException('Material already exists');
    return await this.prisma.material.create({ data });
  }

  async findAll() {
    return await this.prisma.material.findMany();
  }

  async findOne(id: number) {
    const exists = await this.exists(id);
    if (!exists) throw new NotFoundException('Material not found');
    return await this.prisma.material.findFirst({ where: { id } });
  }

  async update(id: number, data: UpdateMaterialDto) {
    const exists = await this.exists(id);
    if (!exists) throw new NotFoundException('Material not found');
    return await this.prisma.material.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.exists(id);
    if (!exists) throw new NotFoundException('Material not found');
    return await this.prisma.material.delete({ where: { id } });
  }

  async exists(id: number) {
    return await this.prisma.material.exists({ id });
  }
}
