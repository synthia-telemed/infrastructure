import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserInputError } from 'apollo-server-express'
import { GraphQLResolveInfo } from 'graphql'
import {
	Appointment,
	AppointmentCreateInput,
	AppointmentWhereInput,
	FindManyAppointmentArgs,
} from 'src/@generated/appointment'
import { AppointmentStatus } from 'src/@generated/prisma'
import { BaseResolver } from 'src/base.resolver'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => Appointment)
export class AppointmentResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Appointment)
	async createAppointment(
		@Args('appointment') data: AppointmentCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Appointment> {
		return this.prismaService.appointment.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [Appointment])
	async appointments(
		@Args() condition: FindManyAppointmentArgs,
		@Info() info: GraphQLResolveInfo
	): Promise<Appointment[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.appointment.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => Appointment, { nullable: true })
	async appointment(
		@Args('where') where: AppointmentWhereInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Appointment | null> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.appointment.findFirst({ where, ...this.getPrismaSelect(info) })
	}

	@Mutation(_returns => Appointment)
	async setAppointmentStatus(
		@Args({ name: 'id', type: () => Number }) id: number,
		@Args({ name: 'status', type: () => AppointmentStatus }) status: AppointmentStatus,
		@Info() info: GraphQLResolveInfo
	): Promise<Appointment> {
		const count = await this.prismaService.appointment.count({ where: { id } })
		if (count == 0) throw new UserInputError('Appointment not found')

		return this.prismaService.appointment.update({
			where: { id },
			data: { status },
			...this.getPrismaSelect(info),
		})
	}
}
