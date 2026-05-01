import { serverApi } from "../../lib/config";
import axios from "axios";
import { LikeInput } from "../../lib/types/like";

class LikeService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async toggleLike(input: LikeInput): Promise<boolean> {
    const result = await axios.post(`${this.path}/like/toggle`, input, {
      withCredentials: true,
    });
    return result.data.liked;
  }

  public async checkLike(likeRefId: string): Promise<boolean> {
    const result = await axios.get(`${this.path}/like/check/${likeRefId}`, {
      withCredentials: true,
    });
    return result.data.liked;
  }
}

export default LikeService;
