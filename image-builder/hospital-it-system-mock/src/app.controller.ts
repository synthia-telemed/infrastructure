import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
	@Get()
	getHealth() {
		return {
			status: 'OK',
			timestamp: new Date().toISOString(),
		}
	}
}
