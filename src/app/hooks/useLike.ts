import { useState, useEffect } from "react";
import { useGlobals } from "./useGlobal";
import LikeService from "../services/LikeService";
import { LikeGroup } from "../../lib/enums/like.enum";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { Messages } from "../../lib/config";
import { Product } from "../../lib/types/product";

export const useLike = (products: Product[] | undefined) => {
  // liked state ni har product uchun alohida saqlash
  const [likedProducts, setLikedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const { authMember, likeBuilder, setLikeBuilder } = useGlobals();

  // logout bo'lganda likelarni tozalash
  useEffect(() => {
    if (!authMember) {
      setLikedProducts({});
    }
  }, [authMember]);

  // sahifa ochilganda likelarni tekshirish
  useEffect(() => {
    if (!authMember || !products?.length) return;
    const likeService = new LikeService();
    products.forEach(async (product) => {
      const isLiked = await likeService.checkLike(product._id);
      setLikedProducts((prev) => ({ ...prev, [product._id]: isLiked }));
    });
  }, [authMember, likeBuilder, products]);

  // toggle handler
  const toggleLikeHandler = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    try {
      if (!authMember) {
        sweetErrorHandling(new Error(Messages.error2)).then();
        return;
      }
      const likeService = new LikeService();
      const isLiked = await likeService.toggleLike({
        likeRefId: productId,
        likeGroup: LikeGroup.PRODUCT,
      });
      setLikedProducts((prev) => ({ ...prev, [productId]: isLiked }));
      setLikeBuilder(new Date());
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return { likedProducts, toggleLikeHandler };
};
