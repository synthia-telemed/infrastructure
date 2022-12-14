import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		RabbitMQModule.forRootAsync(RabbitMQModule, {
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const rabbitmqURL = configService.get('RABBITMQ_URL')
				return {
					uri: rabbitmqURL,
					exchanges: [
						{
							name: configService.get('RABBITMQ_EXCHANGE_NAME'),
							type: 'direct',
							createExchangeIfNotExists: true,
						},
					],
				}
			},
		}),
		ConfigModule,
	],
	providers: [NotificationService],
	exports: [NotificationService],
})
export class NotificationModule {}
