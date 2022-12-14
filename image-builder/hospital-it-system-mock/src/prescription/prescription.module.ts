import { Module } from '@nestjs/common'
import { MedicineModule } from 'src/medicine/medicine.module'
import { PrismaService } from 'src/prisma.service'
import { PrescriptionResolver } from './prescription.resolver'

@Module({
	imports: [MedicineModule],
	providers: [PrismaService, PrescriptionResolver],
})
export class PrescriptionModule {}
