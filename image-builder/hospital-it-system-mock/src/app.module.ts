import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppController } from './app.controller'
import { PatientModule } from './patient/patient.module'
import { DoctorModule } from './doctor/doctor.module'
import { MedicineModule } from './medicine/medicine.module'
import { PrescriptionModule } from './prescription/prescription.module'
import { InvoiceModule } from './invoice/invoice.module'
import { AppointmentModule } from './appointment/appointment.module'
import { DevModule } from './dev/dev.module'
import { NotificationModule } from './notification/notification.module'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PatientModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
			autoSchemaFile: true,
			sortSchema: true,
		}),
		DoctorModule,
		MedicineModule,
		PrescriptionModule,
		InvoiceModule,
		AppointmentModule,
		DevModule,
		NotificationModule,
	],
	controllers: [AppController],
})
export class AppModule {}
