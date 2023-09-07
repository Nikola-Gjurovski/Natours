const { application } = require("express");

class APIFeatures{
    constructor(query,queryString){
      this.query=query;
      this.queryString=queryString;
    }
    filter(){
      const queryOnj={...this.queryString};
     const exludedFields=['page','sort','limit','fields'];
      exludedFields.forEach(items=>delete queryOnj[items])
     let queryStr = JSON.stringify(queryOnj);
      // queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    return this;
    }
    sort(){
      if(this.queryString.sort){
        const dodatoci=this.queryString.sort.split(",").join(" ");
        this.query=this.query.sort(dodatoci);
      }
      else{
        this.query=this.query.sort("-createdAt");
      }
      return this;
    }
    limitFields(){
      if(this.queryString.fields){
        const dodatoci=this.queryString.fields.split(",").join(" ");
        this.query=this.query.select(dodatoci);
      }
      else{
        this.query=this.query.select("-__v");
      }
      return this;
    }
    pagining(){
      let page=this.queryString.page*1 || 1;
  const limit=this.queryString.limit*1 || 100;
  const skip=(page-1)*limit;
  this.query=this.query.skip(skip).limit(limit);
  // if(thus.querySring.page){
  //   const numTours=await Tour.countDocuments();
  //   if(skip>=numTours)throw new Error('This page does not exist');
  // }
  return this;
    }
  }
module.exports=APIFeatures;