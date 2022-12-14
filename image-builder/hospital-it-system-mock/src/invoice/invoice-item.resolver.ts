import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { BaseResolver } from 'src/base.resolver'
import {
	FindManyInvoiceItemArgs,
	InvoiceItem,
	InvoiceItemCreateInput,
	InvoiceItemWhereInput,
} from 'src/@generated/invoice-item'
import { PrismaService } from 'src/prisma.service'

@Resolver(_of => InvoiceItem)
export class InvoiceItemResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => InvoiceItem)
	async createInvoiceItem(
		@Args('invoiceItem') data: InvoiceItemCreateInput,
		@Info() info: GraphQLResolveInfo
	): Promise<InvoiceItem> {
		return this.prismaService.invoiceItem.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [InvoiceItem])
	async invoiceItems(
		@Args() condition: FindManyInvoiceItemArgs,
		@Info() info: GraphQLResolveInfo
	): Promise<InvoiceItem[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.invoiceItem.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => InvoiceItem, { nullable: true })
	async invoiceItem(
		@Args('where') where: InvoiceItemWhereInput,
		@Info() info: GraphQLResolveInfo
	): Promise<InvoiceItem> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.invoiceItem.findFirst({ where, ...this.getPrismaSelect(info) })
	}
}
