import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DoctorResolver } from './doctor.resolver'

@Module({
	providers: [PrismaService, DoctorResolver],
})
export class DoctorModule {}
