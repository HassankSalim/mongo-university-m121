var favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"]

var pipeline = [{
    $match: {
        'tomatoes.viewer.rating': {
            $gte: 3
        }
    },
},{
    $addFields: {
        'num_favs': {
            $size: {
                $ifNull: [{
                    $filter: {
                        input: '$cast',
                        as: 'singlecast',
                        cond: {
                            $in: ['$$singlecast', favorites]
                        }
                    }
                }, []]  
            }
        }
    }
},{
    $sort: { 
        'num_favs': -1,
        'tomatoes.viewer.rating': -1,
        'title': -1
    }
},{
    $skip: 25
},{
    $project: {
        _id:0,
        title: 1
    }
},{
    $limit: 1
}]