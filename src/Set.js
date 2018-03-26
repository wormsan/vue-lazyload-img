// simple Set
let cid = 0
export default class Set {
    constructor () {
        this._map = {}
    }
    add (obj) {
        obj.__cid__ = cid
        cid++
        this._map[obj.__cid__] = obj
    }
    delete (obj) {
        if (obj && obj.__cid__ && this._map.hasOwnProperty(obj.__cid__))
            delete this._map[obj.__cid__]
    }
    forEach (cb) {
        for (let key in this._map) {
            if (this._map.hasOwnProperty(key)) {
                cb (this._map[key])
            }
        }
    }
}