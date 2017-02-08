export default {
    'product':{
        matches:[
        {
            'range': {
                'start': 0,
                'end': 320,
            },
            'resolution': '_260',
        },
        {
            'range': {
                'start': 320,
                'end': 414,
            },
            'resolution': '_360',
        },
        {
            'range': {
                'start': 414,
                'end': Number.MAX_VALUE
            },
            'resolution': '_400'
        }],
        rule:{
            'regex': /\/.[^\/_]+(_\d*)+\.(bmp|jpg|jpeg|gif|png|webp)$/,
            'pos': '$1',
        }
    }
}