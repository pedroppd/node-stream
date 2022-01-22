import {Transform} from 'stream';

export default class WritableMapToCSV extends Transform {

    constructor(props) {
        super(props);
    }

    _transform(chunk, encoding, callback) {
        const result = this.push(`${chunk.id};${chunk.name};${chunk.document}\n`);
        callback(null, result)
    }

}