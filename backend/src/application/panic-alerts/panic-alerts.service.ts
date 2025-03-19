import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PanicAlert } from '../../infraestructure/database/entities/panic-alerts';
import { CreatePanicAlertDto } from './dto/create-panic-alert.dto';
import { UpdatePanicAlertDto } from './dto/update-panic-alert.dto';

@Injectable()
export class PanicAlertsService {
  constructor(
    @InjectRepository(PanicAlert)
    private readonly panicAlertRepository: Repository<PanicAlert>,
  ) {}

  async create(createPanicAlertDto: CreatePanicAlertDto): Promise<PanicAlert> {
    const panicAlert = this.panicAlertRepository.create({
      latitude: createPanicAlertDto.latitude,
      longitude: createPanicAlertDto.longitude,
      user: { id: createPanicAlertDto.userId },
    });
    return this.panicAlertRepository.save(panicAlert);
  }

  async findAll(): Promise<PanicAlert[]> {
    return this.panicAlertRepository.find({
      relations: ['user'],
      order: {
        timestamp: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<PanicAlert> {
    const panicAlert = await this.panicAlertRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!panicAlert) {
      throw new NotFoundException(`Panic alert with ID ${id} not found`);
    }
    return panicAlert;
  }

  async findByUser(userId: number): Promise<PanicAlert[]> {
    return this.panicAlertRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: {
        timestamp: 'DESC',
      },
    });
  }

  async update(id: number, updatePanicAlertDto: UpdatePanicAlertDto): Promise<PanicAlert> {
    const panicAlert = await this.findOne(id);
    Object.assign(panicAlert, updatePanicAlertDto);
    return this.panicAlertRepository.save(panicAlert);
  }

  async remove(id: number): Promise<void> {
    const result = await this.panicAlertRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Panic alert with ID ${id} not found`);
    }
  }
}
