import {pipeline, Readable, Transform} from 'stream'
import { promisify } from 'util'
import { createWriteStream } from 'fs'

const pipelineAsync = promisify(pipeline)

{
    const readableStream =  Readable({
        read: function async () {
            for(let index = 0; index<=1e6; index++)
                this.push(JSON.stringify({ id: index, name: `Pedro-${index}`, document: Math.random().toFixed(5)}))

            this.push(null)
        }
    })

    const writableMapToCSV = Transform({
        transform(chunk, enconding, cb) {
            const data = JSON.parse(chunk)
            const result = `${data.id};${data.name.toUpperCase()};${data.document}\n`
            cb(null, result)
        }
    })

    const setHeader = Transform({
        transform(chunk, enconding, cb) {
            this.counter = this.counter ?? 0
            if(this.counter) {
                return cb(null, chunk)
            }
            this.counter += 1
            cb(null, "id;name;document\n".concat(chunk))
        }
    })


    await pipelineAsync(readableStream, writableMapToCSV, setHeader, createWriteStream('my.csv'));

}