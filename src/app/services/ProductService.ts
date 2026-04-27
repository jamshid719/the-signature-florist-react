import { serverApi } from "../../lib/config";
import axios from "axios";
import { Product, ProductInquiry } from "../../lib/types/product";

console.log("serverApi:", serverApi);
class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  //Backenddan datalarni qabul qilish

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      //doimiy ishlatilmaydigan input larni if bn beramiz.
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;
      if (input.search) url += `&search=${input.search}`;
      console.log("Full URL:", url);
      const result = await axios.get(url); //url 'get' method bulganligi un.
      return result.data;
    } catch (err) {
      console.log("Error, getProducts:", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      let url = `${this.path}/product/${productId}`;

      const result = await axios.get(url, { withCredentials: true }); //browser serverga request yuborayotganda cookie, session yoki authentication ma'lumotlarini ham yuborsin degani.(Browser odatda request yuborilganda cookie/sessions malumotlarni yubormaydi).
      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }
}

export default ProductService;
