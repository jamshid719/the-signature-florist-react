import { LikeGroup } from "../enums/like.enum";

export interface LikeInput {
  likeRefId: string;
  likeGroup: LikeGroup;
}
