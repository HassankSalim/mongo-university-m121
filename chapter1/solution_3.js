var pipline = [{
    $project: {
        'title_count' : {
            $size: {
                $split: ['$title', ' ']
            }
        },
        '_id': 0
    },
},{
    $match : {
        "title_count": 1
    }
}];