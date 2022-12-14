// import { AppointmentStatus, Doctor, Medicine, Patient, Prisma, PrismaClient } from '@prisma/client'
// import { faker } from '@faker-js/faker'
// import * as bcrypt from 'bcrypt'
// import * as dayjs from 'dayjs'

// const prisma = new PrismaClient()

// // Generate a list of fake users
// const generatePatients = (n: number): Prisma.PatientCreateManyInput[] =>
// 	Array.from({ length: n }).map(() => {
// 		const initial = faker.name.prefix()
// 		const firstname = faker.name.firstName()
// 		const lastname = faker.name.lastName()
// 		const nationality = faker.helpers.arrayElement([
// 			'Thai',
// 			'American',
// 			'Finnish',
// 			'Australian',
// 			'Lao',
// 			'Dutch',
// 			'British',
// 		])
// 		return {
// 			id: `HN-${faker.random.numeric(6)}`,
// 			initial_en: initial,
// 			firstname_en: firstname,
// 			lastname_en: lastname,
// 			initial_th: `${initial}_ไทย`,
// 			firstname_th: `${firstname}_ไทย`,
// 			lastname_th: `${lastname}_ไทย`,
// 			birthDate: faker.date.birthdate(),
// 			bloodType: faker.helpers.arrayElement(['A', 'B', 'AB', 'O']),
// 			nationality,
// 			nationalId: nationality === 'Thai' ? faker.random.numeric(13) : undefined,
// 			passportId:
// 				nationality === 'Thai'
// 					? undefined
// 					: `${faker.random.alpha({ count: 2, casing: 'upper' })}${faker.random.numeric(6)}`,
// 			height: faker.mersenne.rand(200, 120),
// 			weight: faker.mersenne.rand(150, 30),
// 			phoneNumber: faker.phone.number('0#########'),
// 		}
// 	})

// const generateDoctors = (n: number): Prisma.DoctorCreateManyInput[] =>
// 	Array.from({ length: n }).map(() => {
// 		const initial = faker.name.prefix()
// 		const firstname = faker.name.firstName()
// 		const lastname = faker.name.lastName()
// 		return {
// 			initial_en: initial,
// 			firstname_en: firstname,
// 			lastname_en: lastname,
// 			initial_th: `${initial}_ไทย`,
// 			firstname_th: `${firstname}_ไทย`,
// 			lastname_th: `${lastname}_ไทย`,
// 			position: faker.helpers.arrayElement([
// 				'Podiatrist',
// 				'Neurologist',
// 				'Psychiatrist',
// 				'Cardiologist',
// 				'Orthopedist',
// 			]),
// 			username: faker.internet.userName(),
// 			password: bcrypt.hashSync('password', 10),
// 			profilePicURL: faker.internet.avatar(),
// 		}
// 	})

// const generateMedicines = (): Prisma.MedicineCreateManyInput[] => {
// 	return Array.from({ length: 10 }).map(() => ({
// 		name: faker.lorem.word(),
// 		description: faker.lorem.paragraph(),
// 	}))
// }

// const generateInvoiceItemWithoutInvoice = (n: number): Prisma.InvoiceItemCreateManyInvoiceInput[] =>
// 	Array.from({ length: n }).map(() => ({
// 		name: faker.commerce.productName(),
// 		price: parseFloat(faker.commerce.price(100, 50000)),
// 		quantity: faker.datatype.number({ min: 1, max: 20 }),
// 	}))

// const generateAppointments = (
// 	patients: Patient[],
// 	doctors: Doctor[],
// 	medicines: Medicine[],
// 	n: number
// ): Prisma.AppointmentCreateInput[] =>
// 	Array.from({ length: n }).map(() => {
// 		const patient = faker.helpers.arrayElement(patients)
// 		const doctor = faker.helpers.arrayElement(doctors)
// 		const dateTime = faker.helpers.arrayElement([
// 			faker.date.future(),
// 			faker.date.soon(),
// 			faker.date.past(),
// 			faker.date.recent(),
// 		])
// 		const isPast = dayjs(dateTime).isBefore(dayjs())
// 		const status = isPast
// 			? faker.helpers.arrayElement([AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED])
// 			: AppointmentStatus.SCHEDULED

// 		// For past completed appointments
// 		let nextAppointment: Date
// 		let invoice: Prisma.InvoiceUncheckedCreateWithoutAppointmentInput
// 		let prescriptions: Prisma.PrescriptionUncheckedCreateWithoutAppointmentInput[]
// 		if (isPast && status === AppointmentStatus.COMPLETED) {
// 			nextAppointment = faker.datatype.boolean() ? faker.date.future() : undefined

// 			// Invoice
// 			const invoiceItems = generateInvoiceItemWithoutInvoice(faker.datatype.number({ min: 1, max: 10 }))
// 			invoice = {
// 				total: invoiceItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
// 				paid: faker.datatype.boolean(),
// 				invoiceItems: { createMany: { data: invoiceItems } },
// 			}

// 			// Prescriptions
// 			prescriptions = Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }).map(() => ({
// 				amount: faker.datatype.number({ min: 10, max: 90, precision: 10 }),
// 				medicineId: faker.helpers.arrayElement(medicines.map(medicine => medicine.id)),
// 			}))
// 		}

// 		return {
// 			doctor: { connect: { id: doctor.id } },
// 			patient: { connect: { id: patient.id } },
// 			dateTime,
// 			detail: faker.lorem.paragraph(),
// 			status,
// 			nextAppointment,
// 			invoice: invoice ? { create: invoice } : undefined,
// 			prescriptions: prescriptions ? { createMany: { data: prescriptions } } : undefined,
// 		}
// 	})

// const seed = async () => {
// 	await prisma.medicine.createMany({ data: generateMedicines() })
// 	await prisma.patient.createMany({ data: generatePatients(100) })
// 	await prisma.doctor.createMany({ data: generateDoctors(30) })

// 	const doctors = await prisma.doctor.findMany()
// 	const patients = await prisma.patient.findMany()
// 	const medicines = await prisma.medicine.findMany()
// 	await Promise.all(
// 		generateAppointments(patients, doctors, medicines, 100).map(appointment =>
// 			prisma.appointment.create({ data: appointment })
// 		)
// 	)
// }

// seed()
// 	.then(() => console.log('Seeded successfully'))
// 	.catch(console.error)
