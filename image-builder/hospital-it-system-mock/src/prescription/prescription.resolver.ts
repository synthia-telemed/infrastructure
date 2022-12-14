import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import {
	FindManyPrescriptionArgs,
	Prescription,
	PrescriptionCreateInput,
	PrescriptionWhereInput,
} from 'src/@generated/prescription'
import { PrismaService } from 'src/prisma.service'
import { BaseResolver } from 'src/base.resolver'

@Resolver(_of => Prescription)
export class PrescriptionResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Prescription)
	async createPrescription(
		@Args('prescription') data: PrescriptionCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Prescription> {
		return this.prismaService.prescription.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => Prescription, { nullable: true })
	async prescription(
		@Args('where') where: PrescriptionWhereInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Prescription> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.prescription.findFirst({ where, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [Prescription])
	async prescriptions(
		@Args() condition: FindManyPrescriptionArgs,
		@Info() info: GraphQLResolveInfo
	): Promise<Prescription[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.prescription.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}
}
