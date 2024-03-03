import { Model, Schema, Types } from "mongoose";

export interface FinalQuery {
  find: Record<string, unknown>;
  where: Record<string, unknown>;
  sort: Record<string, number>;
  start: number;
  limit: number;
}

/**
 * Converts input params into a mongoose query object
 * @param {Model} model - Mongoose model
 * @param {Object} params - Query parameters to convert
 * @returns {FinalQuery} finalQuery - Mongoose query object
 */

async function convertParams(
  model: Model<any>,
  params: Record<string, any>
): Promise<FinalQuery> {
  const schemaKeys = Object.keys(model.schema.obj);
  const queryKeys = Object.keys(params).filter((key) => params[key]);

  const finalQuery: FinalQuery = {
    find: {},
    where: {},
    sort: {created_at:-1},
    start: 0,
    limit: 10,
  };

  for (const key of queryKeys) {
    
     if (key === "search") {
       await processSearchParam(finalQuery, model, schemaKeys, params[key]);
     } else if (key.includes("_sort")) {
       processSortParam(finalQuery, params[key]);
     } else if (key.includes("_start")) {
       finalQuery.start = parseInt(params[key]);
     } else if (key.includes("_limit")) {
       finalQuery.limit = parseInt(params[key]);
     } else {
       processWhereParam(finalQuery, model, schemaKeys, key, params[key]);
     }
 
  }

  console.log(finalQuery, "Final query");
  return finalQuery;
}


function processSortParam(finalQuery: FinalQuery, sortParam: string): void {
  const [sortField, sortOrder] = sortParam.split(":");
  finalQuery.sort = { [sortField]: Number(sortOrder) };
}

async function processSearchParam(
  finalQuery: FinalQuery,
  model: Model<any>,
  schemaKeys: string[],
  searchValue: string
): Promise<void> {
  const indexes = await model.listIndexes();
  const hasTextIndex = indexes.some((index) => index.hasOwnProperty("weights"));

  if (hasTextIndex) {
    finalQuery.find["$text"] = { $search: `\"${searchValue}\"` };
  } else {
    // Get compatible keys for regex search
    const compatibleKeys = schemaKeys.filter((key) => {
      const schemaType = model.schema.paths[key].instance;
      return schemaType === "String";
    });
    // Use compatible keys for regex search
    const regex = new RegExp(searchValue, "i");
    finalQuery.find["$or"] = compatibleKeys.map((field) => {
      return { [field]: { $regex: regex } };
    });
  }
}




function processWhereParam(
  finalQuery: FinalQuery,
  model: Model<any>,
  schemaKeys: string[],
  key: string,
  value: any
): void {
  if (schemaKeys.includes(key) || key === "_id") {
    //@ts-ignore
    const isObjectId = model.schema.obj[key]?.ref ||   model.schema.obj[key]?.type === Types.ObjectId;

    if (isObjectId) {
      finalQuery.find[key] = new Types.ObjectId(value);
    } else {
      finalQuery.find[key] = value;
    }
  } else {
    processWhereParamWithOptions(finalQuery, key, value);
  }
}

function processWhereParamWithOptions(
  finalQuery: FinalQuery,
  key: string,
  value: any
): void {
  const queryOptions = ["_ne", "_lt", "_gt", "_lte", "_gte"];

  queryOptions.forEach((option) => {
    if (key.includes(option)) {
      const mongoOperator = option.replace("_", "$");
      const field = key.replace(option, "");

      if (!finalQuery.find[field]) {
        finalQuery.find[field] = {};
      }

      //@ts-ignore
      finalQuery.find[field][mongoOperator] = value;
    }
  });
}

export default convertParams;