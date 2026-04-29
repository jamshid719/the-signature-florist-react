//memberga daxlador bulgan type integratsiyalar
//bularni shunchaki backendan copy qilib, faqat _id: string ga uzgartiramiz.

import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
  _id: string; //FR.dan string holatda yuboramiz, ObjectId bn emas
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberFirstOrder?: boolean;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  //   _id: string; delete qilamiz(kkmas), sababi bu ID ni biz FR.dan qabul qilmaymiz,balki backendan Auth method orqali murojat etuvchining cookiesidagi tokenlar orqali kim murajat etayotganligini ID sini shaklantirib olamiz.
  //   memberStatus?: MemberStatus; - bu kkmas
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}
