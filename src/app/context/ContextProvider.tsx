import { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobal";

/** Bu - global authentication state ni boshqaruvchi Context Provider */

//Bu wrapper component, ichiga boshqa componentlar uraladi.
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //ReactNode — bu React’da render qilinishi mumkin bo‘lgan barcha narsalar uchun type (TypeScript’da ishlatiladi), yani, ekranga chiqishi mumkin bo‘lgan har qanday narsa.
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData"); // agar browserda "accessToken" mavjud bulmasa, localStorage dagi 'memberData' ham uchir degani(bu mantiq secure qilish un yozildi)

  // Va yuqoridan utsa, yani "accessToken" bulsa, AuthMemberning initial state "memberData" buladi.
  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null,
  );
  console.log("===verify==="); //verify jarayoni sodir bulmoqda degani

  //OrderBuilder
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  //LikeBuilder
  const [likeBuilder, setLikeBuilder] = useState<Date>(new Date());

  return (
    <GlobalContext.Provider
      value={{
        authMember,
        setAuthMember,
        orderBuilder,
        setOrderBuilder,
        likeBuilder,
        setLikeBuilder,
      }}
    >
      {children}
    </GlobalContext.Provider> /* bu GlobalContext.Provider ga { authMember, setAuthMember } integratsiyasini amalga oshirdik, va buni loyihani hoxlagan joyida ishlata olamiz, shungdek index.ts fileda ishlatilishi: 
    <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </ContextProvider>
      
     shu <ContextProvider> ichidagi narsalar {children} hisoblanadi.  */
  );
};

export default ContextProvider;

/**
 Hook bn Contextning farqi: 
 - Hooklarni biz props lar(parent => child) orqali ishlata olamiz, Contextni esa biz Componentlar aro tugridan tugri ishlata olamiz.(Redux bn bir xil).

 - 
 */
