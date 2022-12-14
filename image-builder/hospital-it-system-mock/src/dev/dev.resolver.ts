import { Args, Field, Info, InputType, Int, Mutation, Resolver } from '@nestjs/graphql'
import { AppointmentStatus, Medicine } from '@prisma/client'
import { UserInputError } from 'apollo-server-express'
import { faker } from '@faker-js/faker'
import { Appointment } from 'src/@generated/appointment'
import { BaseResolver } from 'src/base.resolver'
import { PrismaService } from 'src/prisma.service'
import { PrescriptionCreateManyInput } from 'src/@generated/prescription'
import { InvoiceItemCreateManyInvoiceInput } from 'src/@generated/invoice-item'
import { InvoiceDiscountCreateManyInvoiceInput } from 'src/@generated/invoice-discount'
import { GraphQLResolveInfo } from 'graphql'
import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import { NotificationMessage, NotificationService } from 'src/notification/notification.service'
dayjs.extend(utc)

@InputType()
export class GeneratePrescriptionsAndInvoicesInput {
	@Field()
	appointmentIds: number
	@Field()
	prescriptionNums: number
	@Field()
	invoiceItemNums: number
	@Field()
	invoiceDiscountNums: number
}

@Resolver()
export class DevResolver extends BaseResolver {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService
	) {
		super()
	}

	@Mutation(_return => Appointment)
	async resetDemoAppointment(
		@Args({ name: 'appointmentID', type: () => Int }) appointmentID: number,
		@Info() info: GraphQLResolveInfo
	) {
		const appointment = await this.prismaService.appointment.findUnique({
			select: { id: true, status: true, nextAppointment: true, invoice: { select: { id: true } } },
			where: { id: appointmentID },
		})
		if (!appointment) throw new UserInputError('Appointment not found')

		const deleteOps: Promise<any>[] = [
			this.prismaService.appointment.update({
				where: { id: appointmentID },
				data: { status: AppointmentStatus.SCHEDULED, nextAppointment: null },
			}),
			this.prismaService.prescription.deleteMany({ where: { appointmentId: appointmentID } }),
		]

		if (appointment.nextAppointment) {
			const nextAppointment = await this.prismaService.appointment.findFirst({
				select: { id: true },
				where: { startDateTime: appointment.nextAppointment },
			})
			if (nextAppointment)
				deleteOps.push(this.prismaService.appointment.delete({ where: { id: nextAppointment.id } }))
		}
		if (appointment.invoice) {
			deleteOps.push(
				this.prismaService.invoiceItem.deleteMany({ where: { invoiceId: appointment.invoice.id } }),
				this.prismaService.invoiceDiscount.deleteMany({ where: { invoiceId: appointment.invoice.id } })
			)
		}

		await Promise.all(deleteOps)
		if (appointment.invoice) await this.prismaService.invoice.delete({ where: { id: appointment.invoice.id } })
		return await this.prismaService.appointment.findUnique({
			where: { id: appointment.id },
			...this.getPrismaSelect(info),
		})
	}

	@Mutation(_return => Appointment)
	async generatePrescriptionsAndInvoices(
		@Args('generatePrescriptionsAndInvoicesInput') input: GeneratePrescriptionsAndInvoicesInput,
		@Info() info: GraphQLResolveInfo
	) {
		const { appointmentIds, prescriptionNums, invoiceItemNums, invoiceDiscountNums } = input
		const appointment = await this.prismaService.appointment.findUnique({
			where: { id: appointmentIds },
			include: { doctor: true },
		})
		if (!appointment) throw new UserInputError('Appointment not found')
		if (appointment.status !== 'COMPLETED') throw new UserInputError('Appointment is not COMPLETED')

		const medicine = await this.prismaService.medicine.findMany({ take: prescriptionNums })

		const nextAppointmentDate = dayjs.utc().add(6, 'month')
		const itemsPrice = this.randomPrices(invoiceItemNums, 100, 5000)
		const totalPrice = itemsPrice.reduce((p, c) => p + c, 0)
		let discountPriuce = this.randomPrices(invoiceDiscountNums, 500, 2000)
		let i = 1
		while (discountPriuce.reduce((p, c) => p + c, 0) > totalPrice) {
			discountPriuce = this.randomPrices(invoiceDiscountNums, 200, 2000 - i * 10)
			i++
		}
		const ops = [
			this.prismaService.prescription.createMany({
				data: this.generatePrescriptionsFromMedicine(medicine, appointment.id),
			}),
			this.prismaService.invoice.create({
				data: {
					total: totalPrice,
					appointmentId: appointment.id,
					paid: false,
					invoiceItems: {
						createMany: { data: this.generateInvoiceItemsFromPrice(itemsPrice) },
					},
					InvoiceDiscount: {
						createMany: { data: this.generateInvoiceDiscountsFromPrice(discountPriuce) },
					},
				},
			}),
			this.prismaService.appointment.update({
				where: { id: appointment.id },
				data: { nextAppointment: nextAppointmentDate.toDate() },
			}),
			this.prismaService.appointment.create({
				data: {
					detail: faker.lorem.sentences(),
					endDateTime: nextAppointmentDate.add(30, 'minute').toDate(),
					startDateTime: nextAppointmentDate.toDate(),
					doctorId: appointment.doctorId,
					patientId: appointment.patientId,
					status: 'SCHEDULED',
				},
			}),
		]
		await this.prismaService.$transaction(ops)
		const doctorFullName = `${appointment.doctor.initial_en} ${appointment.doctor.firstname_en} ${appointment.doctor.lastname_en}`
		const notfiMessage: NotificationMessage = {
			id: appointment.patientId,
			title: 'Prescriptions and invoices are ready',
			body: `Prescriptions and invoices from from your appointment with ${doctorFullName} are ready. Check the appointment detail for the payment.`,
			data: { appointmentID: `${appointment.id}` },
		}
		this.notificationService.sendNotification(notfiMessage)
		return await this.prismaService.appointment.findUnique({
			where: { id: appointment.id },
			...this.getPrismaSelect(info),
		})
	}

	generatePrescriptionsFromMedicine(med: Medicine[], appointmentId: number): PrescriptionCreateManyInput[] {
		return med.map(med => {
			return { medicineId: med.id, amount: Math.round(Math.random() * 30 + 1), appointmentId }
		})
	}

	generateInvoiceItemsFromPrice(itemsPrice: number[]): InvoiceItemCreateManyInvoiceInput[] {
		return itemsPrice.map(price => ({
			name: faker.commerce.productName(),
			price,
			quantity: Math.round(Math.random() * 30 + 1),
		}))
	}

	generateInvoiceDiscountsFromPrice(itemsDiscount: number[]): InvoiceDiscountCreateManyInvoiceInput[] {
		return itemsDiscount.map(price => ({
			name: faker.helpers.arrayElement(['Social Security', 'Health Insurance', 'Other', 'Promotion']),
			amount: price,
		}))
	}

	randomPrices(n: number, min: number, max: number): number[] {
		return Array.from({ length: n }).map(() => Math.round((Math.random() * (max - min) + min) / 100) * 100)
	}
}
