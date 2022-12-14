import { Injectable } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { ConfigService } from '@nestjs/config'

export interface NotificationMessage {
	id: string
	title: string
	body: string
	data: Record<string, string>
}

@Injectable()
export class NotificationService {
	private readonly exchangeKey: string
	private readonly routingKey: string
	constructor(private readonly amqpConnection: AmqpConnection, private readonly configService: ConfigService) {
		this.exchangeKey = configService.get('RABBITMQ_EXCHANGE_NAME')
		this.routingKey = configService.get('RABBITMQ_ROUTING_KEY')
	}

	sendNotification(payload: NotificationMessage) {
		this.amqpConnection.publish(this.exchangeKey, this.routingKey, payload)
	}
}
