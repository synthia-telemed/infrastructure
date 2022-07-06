import * as pulumi from '@pulumi/pulumi'
import * as resources from '@pulumi/azure-native/resources'
import * as containerregistry from '@pulumi/azure-native/containerregistry'

const location = 'southeastasia'

// Get an existing resource group
const resourceGroup = new resources.ResourceGroup('senior-project')

// Create Azure Container Registry
const containerRegistry = new containerregistry.Registry('senior-project', {
	sku: {
		name: containerregistry.SkuName.Basic,
	},
	location,
	resourceGroupName: resourceGroup.name,
})
