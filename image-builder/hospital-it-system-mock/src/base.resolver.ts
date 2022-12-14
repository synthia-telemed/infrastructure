import { PrismaSelect } from '@paljs/plugins'
import { GraphQLResolveInfo } from 'graphql'

export class BaseResolver {
	getPrismaSelect(info: GraphQLResolveInfo) {
		return new PrismaSelect(info).value
	}

	cleanEmptyWhereField(where: object) {
		Object.keys(where).forEach(key => {
			const field = where[key]
			if (Array.isArray(field)) return field.forEach(el => this.cleanEmptyWhereField(el))
			if (!field) return delete where[key]
			if (typeof field === 'object') return this.cleanEmptyWhereField(field)
		})
	}
}
