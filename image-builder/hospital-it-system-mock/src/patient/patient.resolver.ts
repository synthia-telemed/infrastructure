import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { BaseResolver } from 'src/base.resolver'
import { FindManyPatientArgs, Patient, PatientCreateInput, PatientWhereInput } from 'src/@generated/patient'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => Patient)
export class PatientResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Patient)
	async createPatient(
		@Args('patient') data: PatientCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Patient | null> {
		return this.prismaService.patient.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => Patient, { nullable: true })
	async patient(@Args('where') where: PatientWhereInput, @Info() info: GraphQLResolveInfo): Promise<Patient> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.patient.findFirst({
			where,
			...this.getPrismaSelect(info),
		})
	}
	@Query(_returns => [Patient])
	async patients(@Args() condition: FindManyPatientArgs, @Info() info: GraphQLResolveInfo): Promise<Patient[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.patient.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}
}
