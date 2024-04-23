import { ObjectId } from "mongodb";

type Locomotive = {
  locomotiveCode: string;
  locomotiveName: string;
  locomotiveDimension: string;
  status: number;
  time: string;
  id?: ObjectId;
};

export default Locomotive;
