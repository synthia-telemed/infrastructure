import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import { BaseResolver } from 'src/base.resolver'
import { FindManyInvoiceArgs, Invoice, InvoiceCreateInput, InvoiceWhereInput } from 'src/@generated/invoice'
import { PrismaService } from 'src/prisma.service'
import { UserInputError } from 'apollo-server-express'

@Resolver(_of => Invoice)
export class InvoiceResolver extends BaseResolver {
	constructor(private readonly prismaService: PrismaService) {
		super()
	}

	@Mutation(_returns => Invoice)
	async createInvoice(@Args('invoice') data: InvoiceCreateInput, @Info() info: GraphQLResolveInfo): Promise<Invoice> {
		return this.prismaService.invoice.create({ data, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => [Invoice])
	async invoices(@Args() condition: FindManyInvoiceArgs, @Info() info: GraphQLResolveInfo): Promise<Invoice[]> {
		this.cleanEmptyWhereField(condition)
		return this.prismaService.invoice.findMany({ ...condition, ...this.getPrismaSelect(info) })
	}

	@Query(_returns => Invoice, { nullable: true })
	async invoice(@Args('where') where: InvoiceWhereInput, @Info() info: GraphQLResolveInfo): Promise<Invoice> {
		this.cleanEmptyWhereField(where)
		return this.prismaService.invoice.findFirst({ where, ...this.getPrismaSelect(info) })
	}

	@Mutation(_returns => Invoice)
	async paidInvoice(@Args('id') id: number, @Info() info: GraphQLResolveInfo): Promise<Invoice> {
		const count = await this.prismaService.invoice.count({ where: { id } })
		if (count == 0) throw new UserInputError('Invoice not found')

		return this.prismaService.invoice.update({
			where: { id },
			data: { paid: true },
			...this.getPrismaSelect(info),
		})
	}
}
