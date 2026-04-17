import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalInterface {
  authMember: Member | null; // login bulmagan userlarni hisobga olish kk, shuning null qilib ketdik
  setAuthMember: (member: Member | null) => void; // state update(bunda logout bulayotganda null qiymati kk)
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}

//global state un context yaratish
export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined,
); //bunda istalgan component: to‘g‘ridan-to‘g‘ri data oladi(props uzatish shart emas)

//useGlobal custom hook (bu orqali global state olish)
export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobals within Provider");
  return context;
};
