import swagger from 'swagger-ui-express'
import jsonSwaggerDoc from './swaggerfile.json'

export default [swagger.serve, swagger.setup(jsonSwaggerDoc)]
