import {Transform} from 'stream';

export default class SetHeader extends Transform{

    constructor(props) {
        super(props);
    }

    _transform(chunk, enconding, cb){
        this.counter = this.counter ?? 0
        if(this.counter) {
            return cb(null, chunk)
        }
        this.counter += 1
        cb(null, "uuid;name;document\n".concat(chunk))
    }
}