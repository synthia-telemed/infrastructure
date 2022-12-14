import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import {
	FindManyInvoiceDiscountArgs,
	InvoiceDiscount,
	InvoiceDiscountCreateInput,
	InvoiceDiscountWhereInput,
} from 'src/@generated/invoice-discount'
import { BaseResolver } from 'src/base.resolver'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => InvoiceDiscount)
export class InvoiceDiscountResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => InvoiceDiscount)
	async createInvoiceDiscount(
		@Args('invoiceDiscount') data: InvoiceDiscountCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<InvoiceDiscount> {
		return this.prismaService.invoiceDiscount.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [InvoiceDiscount])
	async invoiceDiscounts(
		@Args() condition: FindManyInvoiceDiscountArgs,
		@Info() info: GraphQLResolveInfo
	): Promise<InvoiceDiscount[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.invoiceDiscount.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => InvoiceDiscount, { nullable: true })
	async invoiceDiscount(
		@Args('where') where: InvoiceDiscountWhereInput,
		@Info() info: GraphQLResolveInfo
	): Promise<InvoiceDiscount | null> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.invoiceDiscount.findFirst({ where, ...this.getPrismaSelect(info) })
	}
}
