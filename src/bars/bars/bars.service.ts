import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bar } from './bar.schema';
import { CreateBarDto } from './create-bar.dto';

@Injectable()
export class BarsService {
  private readonly logger = new Logger(BarsService.name);

  constructor(@InjectModel(Bar.name) private barModel: Model<Bar>) {}

  async create(createBarDto: CreateBarDto): Promise<Bar> {
    this.logger.log(`Intentando crear bar: ${createBarDto.nameBar}`);

    // Validar nombre único
    const existsByName = await this.barModel.findOne({ nameBar: createBarDto.nameBar });
    if (existsByName) {
      this.logger.warn(`Intento de duplicado: Bar con nombre "${createBarDto.nameBar}" ya existe`);
      throw new ConflictException('Ya existe un bar con ese nombre');
    }

    // Validar teléfono único
    if (createBarDto.phone) {
      const existsByPhone = await this.barModel.findOne({ phone: createBarDto.phone });
      if (existsByPhone) {
        this.logger.warn(`Intento de duplicado: Bar con teléfono "${createBarDto.phone}" ya existe`);
        throw new ConflictException('Ya existe un bar con ese teléfono');
      }
    }

    // Validar redes sociales únicas
    if (createBarDto.socialLinks?.facebook) {
      const existsByFacebook = await this.barModel.findOne({ 'socialLinks.facebook': createBarDto.socialLinks.facebook });
      if (existsByFacebook) {
        this.logger.warn(`Intento de duplicado: Bar con Facebook "${createBarDto.socialLinks.facebook}" ya existe`);
        throw new ConflictException('Ya existe un bar con ese Facebook');
      }
    }

    if (createBarDto.socialLinks?.instagram) {
      const existsByInstagram = await this.barModel.findOne({ 'socialLinks.instagram': createBarDto.socialLinks.instagram });
      if (existsByInstagram) {
        this.logger.warn(`Intento de duplicado: Bar con Instagram "${createBarDto.socialLinks.instagram}" ya existe`);
        throw new ConflictException('Ya existe un bar con ese Instagram');
      }
    }

    // Asegurar que ownerId sea ObjectId válido y está presente
    if (!createBarDto.ownerId) {
      throw new ConflictException('El campo ownerId es obligatorio');
    }
    const ownerObjectId = new Types.ObjectId(createBarDto.ownerId);

    const createdBar = new this.barModel({
      ...createBarDto,
      ownerId: ownerObjectId,
    });

    this.logger.log(`Bar ${createBarDto.nameBar} creado en BD`);
    return createdBar.save();
  }

  async findAll(): Promise<Bar[]> {
    this.logger.log('Recibiendo solicitud para listar todos los bares');
    return this.barModel.find().exec();
  }

  async findOne(id: string): Promise<Bar> {
    this.logger.log(`Buscando bar con id: ${id}`);
    const bar = await this.barModel.findById(id).exec();
    if (!bar) {
      this.logger.warn(`Bar con id ${id} no encontrado`);
      throw new NotFoundException(`Bar with id ${id} not found`);
    }
    return bar;
  }

  async update(id: string, updateBarDto: Partial<CreateBarDto>): Promise<Bar> {
    this.logger.log(`Actualizando bar con id: ${id}`);

    // Validaciones similares a create para evitar duplicados al actualizar
    if (updateBarDto.nameBar) {
      const existsByName = await this.barModel.findOne({ nameBar: updateBarDto.nameBar, _id: { $ne: id } });
      if (existsByName) {
        this.logger.warn(`Intento de actualizar con nombre duplicado: "${updateBarDto.nameBar}"`);
        throw new ConflictException('Ya existe un bar con ese nombre');
      }
    }

    if (updateBarDto.phone) {
      const existsByPhone = await this.barModel.findOne({ phone: updateBarDto.phone, _id: { $ne: id } });
      if (existsByPhone) {
        this.logger.warn(`Intento de actualizar con teléfono duplicado: "${updateBarDto.phone}"`);
        throw new ConflictException('Ya existe un bar con ese teléfono');
      }
    }

    if (updateBarDto.socialLinks?.facebook) {
      const existsByFacebook = await this.barModel.findOne({ 'socialLinks.facebook': updateBarDto.socialLinks.facebook, _id: { $ne: id } });
      if (existsByFacebook) {
        this.logger.warn(`Intento de actualizar con Facebook duplicado: "${updateBarDto.socialLinks.facebook}"`);
        throw new ConflictException('Ya existe un bar con ese Facebook');
      }
    }

    if (updateBarDto.socialLinks?.instagram) {
      const existsByInstagram = await this.barModel.findOne({ 'socialLinks.instagram': updateBarDto.socialLinks.instagram, _id: { $ne: id } });
      if (existsByInstagram) {
        this.logger.warn(`Intento de actualizar con Instagram duplicado: "${updateBarDto.socialLinks.instagram}"`);
        throw new ConflictException('Ya existe un bar con ese Instagram');
      }
    }

    const updatedBar = await this.barModel.findByIdAndUpdate(id, updateBarDto, { new: true }).exec();
    if (!updatedBar) {
      this.logger.warn(`No se pudo actualizar. Bar con id ${id} no encontrado`);
      throw new NotFoundException(`Bar with id ${id} not found`);
    }
    this.logger.log(`Bar con id ${id} actualizado correctamente`);
    return updatedBar;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Eliminando bar con id: ${id}`);
    const result = await this.barModel.findByIdAndDelete(id).exec();
    if (!result) {
      this.logger.warn(`No se pudo eliminar. Bar con id ${id} no encontrado`);
      throw new NotFoundException(`Bar with id ${id} not found`);
    }
    this.logger.log(`Bar con id ${id} eliminado correctamente`);
  }
}
