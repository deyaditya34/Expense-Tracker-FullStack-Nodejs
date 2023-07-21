let req = {
  headers: "name",
  query: true,
  params: 9865,
};
let {headers, query, params} = req;

const stringChecker =
  (arr = []) => {
    const errorTypedFields = [arr].filter(
      (field) => typeof Reflect.get(req, "field") !== "string"
    );

    console.log(errorTypedFields)
  };

stringChecker(["headers", "query", "params"]);