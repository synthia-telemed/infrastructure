import { Module } from '@nestjs/common'
import { NotificationModule } from 'src/notification/notification.module'
import { PrismaService } from 'src/prisma.service'
import { DevResolver } from './dev.resolver'

@Module({
	imports: [NotificationModule],
	providers: [PrismaService, DevResolver],
})
export class DevModule {}
