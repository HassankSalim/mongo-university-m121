var x_max = 1521105
var x_min = 5
var min = 1
var max = 10


var pipeline = [{
    $match : {
        'imdb.rating': {
            $gte: 1
        },
        'imdb.votes': {
            $gte: 1
        },
        languages: 'English',
        year: {
            $gte: 1990
        }
    }
},{
    $addFields: {
        x: '$imdb.votes'
    }
},{
    $project: {
        '_id': 0,
        'title': 1,
        'rating': '$imdb.rating',
        'scaled_votes': {
            $add: [1, {
                $multiply: [9, {
                    $divide: [
                        {
                            $subtract:['$x', x_min]
                        },{
                            $subtract:[x_max, x_min]
                        }
                    ]
                }]
            }]
        }
    }
},{
    $addFields: {
        'normalized_rating': {
            $avg: ['$rating', '$scaled_votes']
        }
    }
},{
    $sort: {
        'normalized_rating': 1
    }
},{
    $limit: 1
},{
    $project: {
        'title': 1
    }
}]