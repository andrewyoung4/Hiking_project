class APIFeatures {
  // Mongoose query and queryString from express
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Build Query

  filter() {
    // This creates a hard copy of the req.query. This allows us to change queryObj without changing queryString
    const queryObj = { ...this.queryString };
    // 1A) Filtering - localhost:3000/api/v1/hikes?difficulty=hard
    const excludeTheseFields = ["page", "sort", "limit", "fields"];
    excludeTheseFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Hike.find returns a query
    // We are saving it in the query variable so we can chain more methods to it
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
      // query = query.select('name ratingAverage difficulty');
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
