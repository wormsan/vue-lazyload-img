// simple Set
// will boom on server =.=
let cid = 0
export default class Set {
    private _map: {[cid: number ] : any}
    constructor () {
        this._map = {}
    }
    add (obj: any) {
        obj.__cid__ = cid
        cid++
        this._map[obj.__cid__] = obj
    }
    delete (obj: any) {
        if (obj && obj.__cid__ && this._map.hasOwnProperty(obj.__cid__))
            delete this._map[obj.__cid__]
    }
    forEach (cb: Function) {
        for (let key in this._map) {
            if (this._map.hasOwnProperty(key)) {
                cb (this._map[key])
            }
        }
    }
}