class APIFeatures{
  constructor(model, queryStr){
    this.query = model.find();
    this.queryStr = queryStr;
    // console.log(query);
    console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
    console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
    console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
    console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
    // console.log(queryStr);
  }

  filter(){
     //1.a) Filtering: removing the unwanted fields, to be able to directly use the object as a filter
     let queryObj = {...this.queryStr};
     const execludedFields = ['fields', 'sort', 'page', 'limit'];
     execludedFields.forEach(el => delete queryObj[el]);
     // console.log(queryObj);
 
     //1.b) Further filtering: adding $ before operators [for the same reason]
     let queryStr = JSON.stringify(queryObj);
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
     queryObj = JSON.parse(queryStr);
     // console.log(queryObj);
    this.query.find(queryObj);    
    return this
  }

  sort(){
     //2) Sorting
    if(this.queryStr.sort){
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy)
    }
    else{
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields(){
    
    //3) Limiting fields
    if(this.queryStr.fields){
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    else{
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate(){
        //4) Pagination
        console.log(this.queryStr.limit)
        const pageSize = this.queryStr.limit || 3 ;
        const currentPage = (this.queryStr.page-1)*pageSize || 1;
        this.query = this.query.skip(currentPage).limit(pageSize)    
        return this;
  }
}


module.exports = APIFeatures;