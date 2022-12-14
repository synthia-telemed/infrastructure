import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AppointmentResolver } from './appointment.resolver'

@Module({
	providers: [PrismaService, AppointmentResolver],
})
export class AppointmentModule {}
