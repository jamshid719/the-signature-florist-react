// =>  SECTION 7 (Burak Application develop qilamiz)
// 57. Burak React loyihamizni install qilamiz (REACT)
/**
 * React loyihani urnatish
 * Virtual DOM tushunchasini taxlili
 * React Documentationni urganish
 * Loyihaning packagelarini sozlaymiz va loyihamizning standartini joriy etamiz.
 
1) 
- React ni ustanovka qilish un biz faqat uzini emas, balkim redux + typescript lari bn birga install qilishimiz kk, shuning un uzining website(react.dev- bu saytda faqat uzini ustanovka qlolamiz) orqali emas,  react-redux.js,org sayti orqali ustanovka qilamiz. => npx create-react-app my-app --template redux-typescript (my app urniga uzimizni loyihamizni nomini yozamiz).

- Reactni nextJs va vid meta frameworklar orqali ham ustanovka qilishimiz mumkin edi, lekin biz react lybraryni uzini ustanovka qildik, sababi react asl mohiyatini yahwiroq tushunish un.

- React bu library - Library malum bir amallarni bajarish un xizmat qiladigan kutubxona bulsa, Framework esa bu butun bir ishimizni tashkillashtirishimizda uzida jamiki unsurlarni mujassamlashtirilgan  tizim hisoblanadi. framework bu kengroq tushuncha. React library react bn ishlaganda biz tashqaridan kuproq packagelarni ustanovka qilishimizga tugri keladi, MASALAN: React lib.da routing(react routing DOM) tizimi yuq, shuning un biz uni tashqaridan ustanovka qilamiz, nextJS larda esa bu uzida bor.

- Burak loyihamizning folderiga yonma yon holda gitBash ochib npx create-react-app burak-react --template redux-typescript yozib ustanovka qilamiz.

- FR da ishlash un endi npm ni emas yarn ishlatiladi. va npm install yarn --global qilib ustanovka qilinadi.

- packagelarni ustanovka qilish un node_modules bn locked.package.json ni uchirib yarn install yoki yarn yozib packagelarni ustanovka qilamiz.

- React loyihamiz index.tsx dan boshlanadi.(typescript + react) va 2-file bu App.tsx . shularni ochib olib loyihani yarn run start qilb run qilamiz. va browserda App.ts dagi narsalar kurinadi.

- Programingda boilerPlate degan tushuncha bor, yani kodni boshqa kod orqali yurgizish degani. bu ortiqcha kod yozishga tugri keladi. shuning un Redux Toolkit(redux-toolkit.js.org) kk, ortiqcha kod yozishdan xolos qiladi.

2) Real va Virtual DOM larning farqi. 
 - Real DOM bu webpage ning haqiqiy strukturasi xisoblanadi. Tradional Frontend Developmentda real DOM strukturasidan foydalanadi. (Document object => HTML source= <head> va <body>).

 - Virtual DOM esa Real DOM ning virtual kurinishi hisoblanadi. shu React loyihamiz uzini virtual DOM da qurib olib, uzini real DOM ga kuchirib oladi. Virtual DOM har doim ham hamma mantiqni kuchirmaydi,balki real DOM bn taqqoslab,  uzgargan bulimigina virtual DOMdan Real DOM ga yuklaydi. shuning uchunam V.DOM tez ishlaydi, yani hamma page qayta qayta yuklamaydi, uzgargan qismigina yuklanadi.

 - yana qushimcha farqlari:
   Real DOM - kup harajatli | kup xotira talab etiladi | ishlashi sekin

 - V.DOM va R.DOM uzoro uzviy ravishda ishlaydi. va integratisiyasini ReactDOM package orqali hosil qilamiz.(index.tsx da: ReactDOM from "react-dom";)

 3)
 - React da Component-Based va Declarative terminlar mavjud(legacy.reactjs.org da kurish mumkin). React loyihada hamma narsa component-based hisoblanadi. yani, react ishga tushganda index.tsx ishga tushadi undan kn <App/>(App.tsx) kn shu App ichidagi <Counter /> componentlari ishga tushadi. Declarative esa Companentlar ichida design view ni hosil qilib, componentlarni hoxlagan joydan chaqirib olamiz.


 GitHub ga remote qilish:
 git add . 
 git commit -m"BRR: intitial setup"
 git branch develop

 github.com borib yang (burak-react)repository ochib, linkini olamiz.

 git remote add origin https://github.com/jamshid719/burak-react.git
 git remote (origin projecti bn boglandi)
 git pull origin master(mavjud emas chiqadi, shuning un git push origin master qilishimiz kk, yani origin ga push qilamiz)
 
 endi, develop ga yul olamiz,

 git checkout develop
 git origin push develop (remote ga push qilamiz)

 bu loyihada ham developda ishlaymiz va ohirida masterga hamma sourcemizni merge qlamiz.

 */

//  58. Material UI va uning integratsiyasini amalga oshiramiz (REACT)

/**
 - Material UI ni 3 ta eng asosiy komponenti mavjud.
1- Container - bu loyihaning standartlarini shakllantirib beradigan tushuncha hisoblanadi.
2- Stack layout - bu flexbox un ishlatamiz.
3- Box layout - bu idvidual komponentlar un ishlatiladi.

- Material UI ni loyihaga integratsiya qilish:
default installation
 */

//59. React Router Dom orqali Client routing tizimini hosil qilamiz.

/**
 - React routerni install qilsih un https://v5.reactrouter.com/ sayt orqali qilamiz.

 MISOL un:
 - function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>; 

  mantiqlarni app > screens > About.tsx(component) Yoki folder orqali xosil qilsa ham buladu(recommended)
  kuchiramiz va Containerlarga uramiz
  masalan: 
  function About() {
  return <Container>About</Container>;
}

- linkdan foydalanamiz, kelajakda esa navlink dan foydalanamiz

3 ta COMPONENT mavjud:
1) Screen Component (eng yirik - butun bir pageni ifodalaydi, va folderlar orqali hosil qilinadi)

2) Sectional Componet (qism komponent)

3) common components (reusable - kup ishlatiladigan komponent)
 -   */

//60. Header va Navbarlarni develop qilamiz.
/**
  * Header va footerlarning ahamiyati
  * Figma loyihasiga qarab publishing buyicha rejalarni amalga oshiramiz
  * Header va navbarni publishingnini amalga oshiramiz
  
 1) Header va Footer common componentlarni navlink bn shaklantiramiz.

  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. }
            shuni ichiga useLocation() mantigini yozamiz.

  3) - icons - .svg 
       img - .png, .webp (.webp hajmi kichikroq .png ga qaraganda)        
     
    - manifest.json ichidagilarni faqat name ni qoldirib qolganlarini uchiramiz, chunki biz material theme da ularni hosil qilganmiz.

    {
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}


- css file larni app.tsx dan chaqiramiz. bunday qiliwimizdan sabab, bu ccs(navbar.css) HomeNavbar componentida ham ishlashi un.

- stack bydefault column qib beradi.

-  <Stack
          sx={{ height: "50px" }}
          > => sx berdik chunki stack bu MUI ning style
<img style = "" /> => style berishimizdan sabab img bu HTML ning style
  */

//61. Footer develop qilamiz
/**
 * Headerlarning develop jarayoni yakunlaymiz
 * Footerlarni birga develop qilamiz
 
- boshlashdan oldin frontendda consol.log da chiqayotgan react warning yuqotiwdan bowlaymiz. uning un index.tsx filedagi react sozlamasini oldingi sozlamaga uzgartiramiz.
HOZIRGISI: 
       import ReactDOM from "react-dom";

        //GLOBAL INTEGRATION =>
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

UZGARTIRISH: 
         import { createRoot } from "react-dom/client";

const container = document.getElementById("root")!;
const root = createRoot(container);

//GLOBAL INTEGRATION =>
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);


 */

//64. ProductsPage - Products sahifasini publish qilamiz (REACT)
/**
 * ProductsPage Screen Componentida nested routing tizimini hosil etamiz
 * ProductsPage Screen Componentiga daxldor Sectional Componentlarni qurib olamiz
 * Products list Sectional Componentini publishing qilamiz.
 
 1)  ProductsPage ichida yangi routinglarni xosil qilish . bu nested routing deyiladi.

 masalan: App.tsx da yani birlamchi routing tizimida faqat linklarga etibor bersa, ikkilamchi(nested routing) esa screen componentdagi aynan biz app.tsx joriy etgan birlamchi routingdan kngi kelayotgan routinga(linkga) etibor qaratadi. 
  
 */

//78. Hooks - useState va useEffect React Hooks
/**
  * Reactning Class va Functional Componentlarini urganamiz
  * Lifecycle methodlarini birga tahlil qilamiz
  * useState va useEffect hookni urganamiz
  
 1) - Reactda doim 2xil componentlar mavjud bulgan: Class va functional. Classlar hozir ishlatilmaydi, chunki state, propertylarni yozganda uzun , kup elementlardan tashkil topgani un noqulayliklar tugiladi. functional componentlar sodda va oson, ammo ularda Classlar singari uzining ichki state tushunchasi yuq. va shuning un suniy statelar hooklar(useState) orqali hosil qilinadi. Shu asnoda biz Class componentlaridan tuliq voz kechilgan.

 - Functional Component lar bn hooklarning farqi: Functional componentlar view qaytaradi, hooklar esa malum bir mantiqlarni qaytaradi.

 2) - Lifecycle methodlar 3ta:  componentDidMount()
                                componentDidUpdate()
                                componentWillUnmount()
yana bular react ning fazalari deb ataladi.

- Mounting means putting elements into the DOM.

- componentDidMount() 1-component mount bulganda ishlatiladi.
- componentWillUnmount() bu componentimiz yashirilishidan oldin ishga tuwadi.
- componentDidUpdate() malum bir componentimizdagi qiymat uzgartirgandagi natijasini virtualDom RealDOM da rebuild qilib oladi.

- Shu har 3 ta fazani qurib olish un UseEffect hooki yordamga keladi.

XULOSA QILIB AYTGANDA: Class componentdagi statelarni va lifeCycledagi turli tuman fazalarni hooklar orqali functional componentda hosil qilish mumkin.

3) - React Hooks
React useState - Asosiy iwlatiladigan
React useEffect - Asosiy iwlatiladigan
React useContext
React useRef
React useReducer
React useCallback
React useMemo
React Custom Hooks

Hooks added to React in version 16.8 

-   useEffect(() => {
    console.log("componentDidMount");//useEffect ishga tuwgandan 1-bb componentDidMount jarayoni ishga tushadi.(DATA FETCH), yani backenddan datalar olib kelinadi.

     return () => {
      console.log("componentWillUnmount");
    };

  }, []);

  va uning 2 ta arg. mavjud. biri gulli qavsning ichida, 2-si [](array dependency).

  - array dependency[] ning ishatish sababi, useEffect 1marta ishga tushadi, agar arr.dependency ga malum bir value kiritsak va shu value har uzgarganda useEffect qayta ishga tushishini taminlaydi.
  u bizga(value uzgarib turgandagi holat) componentDidUpdate() ni beradi.

  - shu arr.dependency ni har doim boshlanishda bush arrayga([]) tenglab olamiz, agar shu arrayni uzi bulamasa frontendimizda useEffect qayta-qayta uzliksiz ishga tuwirib yuboradi.
 */

//79. Redux - Loyihamiz storage architecturasi
/**
   * loyihamizni qandayurnatganligimizni va qay tarzda run bulayotganligini tahlil qilamiz
   * Loyihamizning Redux Architectureni urganamiz
   * Redux Toolkit ning afzalliklari kuramiz
   
  1) React loyihamiz ham backend singari TS da develop buladi, Production esa JS da run buladi.

  - start run build qilsak TS ni JS ga ugirib beradi hamda bitta "build" folder yaratdi.
  
  - yarn global add serve // package urnatiladi va  serve -s build (yoki npx serve -s build)kommandasi orqali loyihani local mashinada hamda networkda ham run qilib beradi.

  - Redux Architecture. uzi frontendda AP bb, ulardan 3 tasini kursak 
  MVC, FLUX, REDUX. shularning ichidan eng mashhuri bu REDUX bb, u FLUX mantigidan kelib chiqqan

  - REDUX bu React asosan ishlatiladi. lekin bu alohida bitta package buni boshqa VUE va Angularda ham ishlatiladi.

  REDUX Artichecture da asosiy urgu Reducerga beriladi. va 2 ta oqim bor Dispatch(slice) hamda Subscribe(selector) oqimi.

  tashkil topishi: Action => Reducer => Store => View.

  - AP larning farqlari: MVC vs FLUX vs REDUX (https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences)

  by Dataflows directions: 
  Follows the bidirectional flow - MVC 
  Follows the unidirectional flow - FLUX,REDUX

  by Stores
  No concept of store - MVC
  Includes multiple stores - FLUX
  Includes single store - REDUX

  by Business Logic resides
  Controller handles entire logic - MVC
  Store handles all logic - FLUX
  Reducer handles all logic -REDUX

  by Debugging
  Diffucult - MVC
  Easy - REDUX

  by Where can be used
  Both(FR & BC) - MVC
  FR - FLUX, REDUX 


- agar REDUX bulmaganda datalarni Parent => Child asnosida yuboriladi(bu qiyin). Redux da bitta storeda malumotlar saqlanadi va harqanday componentlarda bemalol ishlatiladi.

3) REdux toolkit. agar bu toolkit bulmaganda oldinlari reduxdagi har bir bulimini alohida manual qilib qurib olish kk edi, bu esa uz navbatida boilerPlate buladi.

Redux toolkit esa bizga bydefault shu mantiqlarni(store va hooks files) yaratib beradi. va  biz qilishimiz kk bulgan narsa dispatch va subscribe ni yaratib olish buladi.
dispatch - bu backend kelgan malumotlarni olib storega yozadi.
subcribe - store dagi malumotlarni view ga yuboradi.


   */

// 80. HomePage - Redux Slice va Selectorlarini tashkil etamiz*
/**
 * HomePage Screen Componentiga daxldor type integrationlarni amalga oshiramiz
 * HomePage Screen Componentimizning Redux storageni configuratsiyasini amalga oshiramiz
 * Redux logger middlewareni integratsiyasini amalga oshiramiz
 * HomePagega daxldor Redux Architectureni test qilish
 
1) Redux store ni hosil qilishdan oldin butun tizimni type integratsiyasini hosil qilish kk.(lib => types folder => screen.ts(butun application un)). 
Type integratsiyalarning 2 xil usuli bor:
 1. Screen component based types(biz tanlagan usul)
 2. Target Oriented type integration


 2) HomePage Screen Componentimizning Redux store sini hosil qilish un screens => homePage folder => slice.ts & selector.ts filelar hosil qilinadi.
 
 - Redux Artichecture faoliyati reducerlarga boglangan. Backend dan datalar olingandan sung, u malumotlar reducer lar orqali redux storega yoziladi, hamda ularni chaqirish esa selector lar orqali.

 - homePagening index.ts ichiga Redux storega malumotlarni yozish mantigini yozamiz. va reactning fazalari kk, va uni useEffect orqali shaklantiramiz. sgu holatda: 
 
 export default function HomePage() {
  //Selector: Store => Data(store dan datani qabul qlish)

  useEffect(() => {
   //Backend server data request => Data(backendan datani qabul qlish)

   //Slice: Data => Store (datani store ga yozish)
  }, [])

  //storega yozmasa ham buladi, agar faqat shu joyda(HomePage screen componentda) tugridan tugri ishlatmoqchi bulsak.

  3) Redux da joylashgan malumotlarni(yani, storeda qanday malumotlar mavjud va qay tarzda uzgarayotganligini aniq qilb logging qib beradi. bu narsalarni FR. ning consoleda kuriwimiz mumkin) logging qilish maqsadida redux-loggerni middleware sifatida install qilamiz va uni store.ts fileda integratsiyasini amalga oshiriw kk buladi. 1-bb uni ustanovaka qilamiz.  yarn add redux-logger@^3.0.6  hamda typeni yarn add @types/redux-logger@^3.0.13 -D.

  4)
 */

//81. HomePage - Backend olingan malumotlar orqali develop yakunlaymiz*
/**
 * Frontendga daxldor environmental variablelarni va configuration faylni hosil qilish
 * Backenddan malumotlar olish maqsadida API Servicelarini joriy etamiz
 * API Servicelarorqali olingan malumotlar asosida HomePage Screen Componentimizni developing jarayonini yakunlash
 
1) 1-bb,.env ga api adressni joylaymiz, http://localhost:3003
va configuration filelarni hosil qilamiz.(lib => config.ts)

2) - Backenddan datalrni tugridan tugri useeffect  ning ichidan olmaymiz, bali alohida Service filelar hosil qilib shular orqali chaqiramiz.(app=> services folder=> Service.ts)

- Browser orqali backenddan datalarni olishda "CORS policy" ishga tushib, datalarni olib bulmaydi, yani shu requestni backend neglect qiladi. Backend bu request ni qabul qilish un cors packageni backendga install qilish kk. va uni App.ts da app.use(cors({ credentials: true, origin: true })); qilib integratsiya qilamiz.

- Backendan qabulib uni reduxga yozganimzdan kn dispatch ni screen componentida iwlatamiz, selector ni esa qaerda ishlatmoqchi bulsak ushayerdan call qilamiz.

 */

//85. Token Authentication develop qilamiz
/**
 * Authentication modal Componentini publishingni amalga oshiramiz
 * Authentication jarayonini siz bn birga develop qilamiz
 */

//86. Token Authentication davom ettiramiz
/**
 * Global variablelarni hosil qilish un customized hooklardan foydalanamiz
 * Hosil qilgan customized hooklarimizda context integratsiyasini amalga oshirish
 * Userlarimiz authenticated bulganda hooklarimizni ishlatishni urganamiz
 * Logout jarayonini develop qilamiz
 * 
 1)  { withCredentials: true }  FRdan BN ga tokenlarni olib boradi, va umuman tokenlar oldi berdi bulishi un shartlar (protokollar) bb, agra FR va BN 2 xil domainda bulsa hamda ular Https da bulmasa , u holda bu ishlamaydi({ withCredentials: true } bulganida ham).
 - Umuman olganda, accesstoken bn localstorage ni amalga oshirgan bn auth. jarayonini tuliq amalga oshirolmaymiz, uni amalga oshirish un customized hooklarni xosil qilgan holda useContext bn integratsiyasini amalga oshirish kk buladi.(yani, BNdan olingan auth. malumotlarini global context storagega joylash kk buladi.)
 - Customized hooklarni hosil qilish: hooks => useGlobal.ts
 - Contextlar bn ishlash un: app=> context => Context.tsx  va shuni ichida maxsus bir package kk buladi, yani cookieni ichidan malumotni olish un  yarn add universal-cookie@^4.0.4  shu package orqali browserdan cookielarni olish un ishlatiladi.
 */

//119. NestJS organamiz va ZOO Rest API loyihasini quramiz *
/**
  * NestJS uzi nima
  * NestJSda muhim urinni egallagan NestJS ingridentlari haqida gaplashimz
  * NestJS ning markaziy Module Decorator tushunchasi va uning tarkibiy qismlarini tahlil etamiz
  * NestJS da Rest API bulmish Zoo loyihasini birga tashkil etamiz
  
 1) NestJs cli(commonline) install qilamiz: npm i -g @nestjs/cli

 - Nestar loyiha backend => nestJs
 - Nestar loyiha frontend => nextJs

 - NestJS is a framework for building efficient, scalable Node.js server-side application.(yani, nestJs server-side applicationni qurish un xizmat qiladigan nodeJs frameworki hisoblanadi.). 

 - Loyihalarni efficient usulda optimal usulda quramiz, uzoq yuldan bormay.

 - TS ni qullab quvvatlaydi. Hamda OOP(AOP - Aspect Object Programming paradigmasiga moslashgan va bu module qismini hosil qilish un xizmatga keladi )

 - Applies MVC,DI - Artichectual patterns, Middleware,Decorator - disign patterns, bu yerda MVC bn DI asosiy urin olsada, aynan nestJs loyihalarda  AOP integratsiyasini amalga oshirish un Decorator patternlar yordamga keladi. va eng muhim hisoblanadi.


- NestJS uzing common line NestJS CLI ega. bu ishimizni osonlashtiradi qisqa komandlar orqali, masalan, biz controllerlarni noldan qurib utirmaymiz, shunchaki commoline ga buyruq bersak bizga controllerni qurib beradi. 
  NestJs cli(commonline) install qilamiz: npm i -g @nestjs/cli

 - NestJS Express frameworkini ustida qurilgan turi mavjud hamda Fastify da qurilgan turi bor.
 
 - Loyihalarimiz ExpressJs da qurilgan usulida yaratamiz

 2) NESTJS INGRIDENTLARI: 
    Controller - creating endpoints
    Modules - adding dependincies
    Services - business logic
    Guards - authorithation
    Pipes - validation | transformation

  3) @Module decorator properties: 
  Providers => Array of providers(module via dependency of injection)
  Controllers => Array of controllers instiated within module
  exports: Array of providers to export to othermodules
  imports: List of modules required by this module
  
  4) NestJS commonline komandalari: terminalda => nest g --help
  yozsak generate ga doir komandalrini chiqarib  beradi. 

   name          │ alias       │ description                                  │
    │ application   │ application │ Generate a new application workspace         │
    │ class         │ cl          │ Generate a new class                         │
    │ configuration │ config      │ Generate a CLI configuration file            │
    │ controller    │ co          │ Generate a controller declaration            │
    │ decorator     │ d           │ Generate a custom decorator                  │
    │ filter        │ f           │ Generate a filter declaration                │
    │ gateway       │ ga          │ Generate a gateway declaration               │
    │ guard         │ gu          │ Generate a guard declaration                 │
    │ interceptor   │ itc         │ Generate an interceptor declaration          │
    │ interface     │ itf         │ Generate an interface                        │
    │ library       │ lib         │ Generate a new library within a monorepo     │
    │ middleware    │ mi          │ Generate a middleware declaration            │
    │ module        │ mo          │ Generate a module declaration                │
    │ pipe          │ pi          │ Generate a pipe declaration                  │
    │ provider      │ pr          │ Generate a provider declaration              │
    │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
    │ resource      │ res         │ Generate a new CRUD resource                 │
    │ service       │ s           │ Generate a service declaration               │
    │ sub-app       │ app         │ Generate a new application within a monorepo │
  */
