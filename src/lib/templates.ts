import { Block } from "@/types";
import { createBlock } from "./blocks";

export interface StarterTemplate {
  id: string;
  name: string;
  description: string;
  createBlocks: () => Block[];
}

export const starterTemplates: StarterTemplate[] = [
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Announce a new product with hero image, details, and CTA",
    createBlocks: () => {
      const header = createBlock("header");
      const hero = createBlock("hero");
      (hero.props as Block<"hero">["props"]).headline = "Introducing Something New";
      (hero.props as Block<"hero">["props"]).subheadline = "The latest addition to your beard care arsenal. Crafted with care, made in the UK.";

      const text = createBlock("text");
      (text.props as Block<"text">["props"]).content =
        "We've been working on something special. Our newest product is packed with natural ingredients designed to keep your beard looking and feeling its absolute best. 100% natural. Cruelty-free. Made in the UK.";

      const product = createBlock("product");
      const cta = createBlock("ctaButton");
      (cta.props as Block<"ctaButton">["props"]).text = "Shop Now";

      const divider = createBlock("divider");
      const footer = createBlock("footer");

      return [header, hero, text, product, cta, divider, footer];
    },
  },
  {
    id: "promotional-sale",
    name: "Promotional / Sale",
    description: "Discount banner with featured products and promo code",
    createBlocks: () => {
      const header = createBlock("header");
      const discount = createBlock("discount");
      (discount.props as Block<"discount">["props"]).description = "Limited time offer — don't miss out!";
      (discount.props as Block<"discount">["props"]).code = "BEARD20";

      const hero = createBlock("hero");
      (hero.props as Block<"hero">["props"]).headline = "The Big Beard Sale";
      (hero.props as Block<"hero">["props"]).subheadline = "Save on our best-selling grooming essentials. Your beard will thank you.";

      const productGrid = createBlock("productGrid");
      const cta = createBlock("ctaButton");
      (cta.props as Block<"ctaButton">["props"]).text = "Shop the Sale";

      const text = createBlock("text");
      (text.props as Block<"text">["props"]).content =
        "Use code BEARD20 at checkout. Offer valid for a limited time only. Cannot be combined with other offers. Free shipping on orders over £20.";
      (text.props as Block<"text">["props"]).fontSize = 12;
      (text.props as Block<"text">["props"]).textAlign = "center";
      (text.props as Block<"text">["props"]).color = "#999999";

      const footer = createBlock("footer");

      return [header, discount, hero, productGrid, cta, text, footer];
    },
  },
];
