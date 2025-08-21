// src/menus/menus.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, ForbiddenException, Logger } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { BarsService } from '../bars/bars/bars.service';

@Controller('menus')
export class MenusController {
  private readonly logger = new Logger(MenusController.name);

  constructor(
    private readonly menusService: MenusService,
    private readonly barsService: BarsService, // inyectamos para validar bar owner
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  async create(@Body() createMenuDto: CreateMenuDto, @Request() req) {
    // Validar que usuario sea owner del bar o admin antes de crear menú
    if (req.user.role !== 'admin') {
      const bar = await this.barsService.findOne(createMenuDto.barId);
      if (bar.ownerId.toString() !== req.user.userId) {
        this.logger.warn(`Usuario ${req.user.userId} intentó crear menú en bar no propio ${createMenuDto.barId}`);
        throw new ForbiddenException('No tienes permiso para crear menú en este bar');
      }
    }

    return this.menusService.create(createMenuDto);
  }

  @Get()
  async findAll() {
    return this.menusService.findAll();
  }

  @Get('bar/:barId')
  async findByBar(@Param('barId') barId: string) {
    return this.menusService.findAll(barId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @Request() req) {
    if (req.user.role !== 'admin') {
      const menu = await this.menusService.findOne(id);
      const bar = await this.barsService.findOne(menu.barId.toString());
      if (bar.ownerId.toString() !== req.user.userId) {
        this.logger.warn(`Usuario ${req.user.userId} intentó actualizar menú no propio ${id}`);
        throw new ForbiddenException('No tienes permiso para actualizar este menú');
      }
    }

    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') {
      const menu = await this.menusService.findOne(id);
      const bar = await this.barsService.findOne(menu.barId.toString());
      if (bar.ownerId.toString() !== req.user.userId) {
        this.logger.warn(`Usuario ${req.user.userId} intentó eliminar menú no propio ${id}`);
        throw new ForbiddenException('No tienes permiso para eliminar este menú');
      }
    }

    return this.menusService.remove(id);
  }
}
