# generate api from swagger from dev server
.Panha:api
api:
	node ./src/core/libs/generate/api.js ./src/core/services/api /admin/  http://localhost:3001/admin/v1/api-docs/yaml


.Panha:api_local
api_local:
	node ./node_modules/@qsh/generate/api.js ./src/services/api /admin/  http:

.Panha:order
order:
		node ./src/translationOrder.js

