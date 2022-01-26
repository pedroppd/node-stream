import {pipeline, Readable, Transform} from 'stream'
import { promisify } from 'util'
import { createWriteStream } from 'fs'
const type ="TELEPHONE_NAME_CEP";
const corpo = "975113948,Pedro Dantas,25635340\n";

const pipelineAsync = promisify(pipeline)
{
    const readableStream =  Readable({
        read: function async () {
            for(let index = 0; index<=50000; index++)
                this.push(corpo)
            this.push(null)
        }
    })
    const writableMapToCSV = Transform({
        transform(chunk, enconding, cb) {
            //const data = JSON.parse(chunk)
            // const result = `${data.id};${data.name.toUpperCase()};${data.document}\n`
            cb(null,chunk)
        }
    })
    const setHeader = Transform({
        transform(chunk, enconding, cb) {
            this.counter = this.counter ?? 0
            if(this.counter) {
                return cb(null, chunk)
            }
            this.counter += 1
            cb(null,`${type}\n`)
        }
    })
    await pipelineAsync(readableStream, writableMapToCSV, setHeader, createWriteStream(`csvs/${type}.csv`));
}