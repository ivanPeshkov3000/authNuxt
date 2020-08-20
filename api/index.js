export default async (req, res, next) => {
    const paths = req.pathname.split('/')
    const zeroIndex = paths.findIndex(i => i == 'api')
    const handlerName = paths[zeroIndex + 1]
    const method = paths[zeroIndex + 2]

    console.log('Router.\n  Path: %s\n  Handler: %s\n  Method: %s\n', req.pathname, handlerName, method)
    const handler = require('./' + handlerName)
    handler[method || 'default'](req, res, next)
}