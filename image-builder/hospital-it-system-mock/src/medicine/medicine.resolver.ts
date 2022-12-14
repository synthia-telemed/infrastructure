import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { BaseResolver } from 'src/base.resolver'
import { FindManyMedicineArgs, MedicineCreateInput, MedicineWhereInput } from 'src/@generated/medicine'
import { Medicine } from 'src/@generated/medicine/medicine.model'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => Medicine)
export class MedicineResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Medicine)
	async createMedicine(
		@Args('medicine') data: MedicineCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<Medicine | null> {
		return this.prismaService.medicine.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => Medicine, { nullable: true })
	async medicine(@Args('where') where: MedicineWhereInput, @Info() info: GraphQLResolveInfo): Promise<Medicine> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.medicine.findFirst({ where, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [Medicine])
	async medicines(@Args() condition: FindManyMedicineArgs, @Info() info: GraphQLResolveInfo): Promise<Medicine[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.medicine.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}
}
