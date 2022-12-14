import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PatientResolver } from './patient.resolver'

@Module({
	providers: [PrismaService, PatientResolver],
})
export class PatientModule {}
