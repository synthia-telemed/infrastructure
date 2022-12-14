import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { InvoiceDiscountResolver } from './invoice-discount.resolver'
import { InvoiceItemResolver } from './invoice-item.resolver'
import { InvoiceResolver } from './invoice.resolver'

@Module({
	providers: [InvoiceDiscountResolver, InvoiceItemResolver, InvoiceResolver, PrismaService],
})
export class InvoiceModule {}
