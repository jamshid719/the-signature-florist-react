import { serverApi } from "../../lib/config";
import axios from "axios";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  //Backenddan datalarni qabul qilish

  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users";

      const result = await axios.get(url); //url 'get' method bulganligi un.
      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }

  public async getRestaurant(): Promise<Member> {
    try {
      const url = this.path + "/member/restaurant";

      const result = await axios.get(url); //url 'get' method bulganligi un.
      const restaurant: Member = result.data;
      return restaurant; //shunday qib ham yozsak buladi.
    } catch (err) {
      console.log("Error, getRestaurant:", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input);
      console.log("signup:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("Error, signup:", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("Error, login:", err);
      throw err;
    }
  }

  ///1-usul: hech qanday qiymat qaytarmasligi
  public async logout(): Promise<void> {
    try {
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true }); //body da hech narsa quymagimiz un {} quyib ketdik
      console.log("logout:", result);

      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("Error, logout:", err);
      throw err;
    }
  }

  //2-usul: boolean qaytarishi
  /**  
      public async logout(): Promise<boolean> {
    try {
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true }); //body da hech narsa quymagimiz un {} quyib ketdik
      console.log("logout:", result);

      localStorage.removeItem("memberData");
      return result.data.logout
    } catch (err) {
      console.log("Error, logout:", err);
      throw err;
    }
  }
     */

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberDesc", input.memberDesc || "");
      formData.append("memberImage", input.memberImage || "");

      //formData orqali bulganligi un sintaksis shunaqa buladi.
      const result = await axios(`${serverApi}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // image ni yuborish mantiq qilayotganimiz un
        },
      });
      console.log("updatedMember", result);

      const member: Member = result.data;
      //return qilishdan oldin biron bir qiymat yangilansa bulsa, localStorage ni ham yangilab olish kk.
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;

      //
    } catch (err) {
      console.log("Error, updateMember:", err);
      throw err;
    }
  }
}

export default MemberService;
