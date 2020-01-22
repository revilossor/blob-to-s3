const { Readable } = require('stream')

const rs = new Readable;  //??
rs.push('1')
rs.push('2')
rs.push('3')
rs.push(null)

console.dir({ rs })

rs.pipe(process.stdout)
