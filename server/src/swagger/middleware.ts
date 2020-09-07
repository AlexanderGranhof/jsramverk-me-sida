import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import swagger from 'swagger-ui-express'

const yamlSwaggerDoc = fs.readFileSync(path.resolve(__dirname, 'swaggerfile.yml'), 'utf8')
const jsonSwaggerDoc = yaml.safeLoad(yamlSwaggerDoc) as Record<string, unknown>

export default [swagger.serve, swagger.setup(jsonSwaggerDoc)]
