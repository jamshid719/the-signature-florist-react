export enum OrderStatus {
  PAUSE = "PAUSE",
  PROCESS = "PROCESS",
  FINISH = "FINISH",
  DELETE = "DELETE",
}

//Basket orqali orderni hosil qilganda bu PAUSE ga borib joylashadi => tulovi amalga oshirilganda PROCESS da, yani dostavka qilish jarayonida => kn qabul qilgandan kn FINISH jarayoniga keladi.

//Agar PAUSE da bulgan tovarni puli tulanmagan bulsa DELETE ga utqazishimiz mumkin.
