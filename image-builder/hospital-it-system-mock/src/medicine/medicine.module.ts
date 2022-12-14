import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MedicineResolver } from './medicine.resolver'

@Module({
	providers: [PrismaService, MedicineResolver],
})
export class MedicineModule {}
